"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import type {
  OfferSubmission,
  OfferType,
  OfferTabData,
  OfferRow,
  SubmissionStatus,
  OfferColumnConfig
} from "@/mocks/types/offer-submission";
import { OFFER_COLUMNS } from "@/mocks/types/offer-submission";

const STORAGE_KEY = "@meta21:offer_submission";
const AGENCY_NOTIF_KEY = "@meta21:offer_notification"; // maintained key for backwards-compat config
const MGR_NOTIF_KEY = "@meta21:manager_notification";

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyRow(): OfferRow {
  return { id: generateId(), descricao: "", venda: null, promocao: null, limite: "" };
}

function emptySubmission(): OfferSubmission {
  return {
    id: generateId(),
    tabs: {},
    status: "draft",
    submittedAt: null,
    submittedBy: "",
    unitId: "",
    notes: "",
    receivedAt: null,
  };
}

export function useOfferStorage() {
  const [submission, setSubmission] = useState<OfferSubmission>(emptySubmission);
  const [hasAgencyNotification, setHasAgencyNotification] = useState(false);
  const [hasManagerNotification, setHasManagerNotification] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSubmission(JSON.parse(raw));
    } catch { /* ignore */ }

    setHasAgencyNotification(localStorage.getItem(AGENCY_NOTIF_KEY) === "true");
    setHasManagerNotification(localStorage.getItem(MGR_NOTIF_KEY) === "true");
  }, []);

  /** Persists the current submission to localStorage */
  const persist = useCallback((s: OfferSubmission) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setSubmission(s);
  }, []);

  /** Gets (or creates) a tab's data */
  const getTab = useCallback(
    (type: OfferType): OfferTabData => {
      const existing = submission.tabs[type];
      if (existing) {
        if (!existing.columns) {
          return { ...existing, columns: [...(OFFER_COLUMNS[type] || [])] };
        }
        return existing;
      }
      return { type, period: "", columns: [...(OFFER_COLUMNS[type] || [])], rows: [emptyRow()] };
    },
    [submission.tabs]
  );

  /** Updates a single tab's data */
  const updateTab = useCallback(
    (type: OfferType, tab: OfferTabData) => {
      const updated: OfferSubmission = {
        ...submission,
        tabs: { ...submission.tabs, [type]: tab },
      };
      persist(updated);
    },
    [submission, persist]
  );

  /** Adds an empty row to a tab */
  const addRow = useCallback(
    (type: OfferType) => {
      const tab = getTab(type);
      updateTab(type, { ...tab, rows: [...tab.rows, emptyRow()] });
    },
    [getTab, updateTab]
  );

  /** Removes a row from a tab by row id */
  const removeRow = useCallback(
    (type: OfferType, rowId: string) => {
      const tab = getTab(type);
      const rows = tab.rows.filter((r) => r.id !== rowId);
      updateTab(type, { ...tab, rows: rows.length ? rows : [emptyRow()] });
    },
    [getTab, updateTab]
  );

  /** Updates a single row field */
  const updateRow = useCallback(
    (type: OfferType, rowId: string, field: keyof OfferRow, value: string | number | null) => {
      const tab = getTab(type);
      const rows = tab.rows.map((r) =>
        r.id === rowId ? { ...r, [field]: value } : r
      );
      updateTab(type, { ...tab, rows });
    },
    [getTab, updateTab]
  );

  /** Pastes TSV data (from Excel) into a tab starting at a given row index */
  const pasteRows = useCallback(
    (type: OfferType, startIndex: number, tsv: string, columns: (keyof OfferRow)[], hasHeaderRow = false) => {
      const tab = getTab(type);
      const lines = tsv.trim().split("\n").filter(Boolean);
      const startLine = hasHeaderRow ? 1 : 0;
      
      const pastedRows = lines
        .slice(startLine)
        .map((line) => {
          const cells = line.split("\t");
          const row: OfferRow = { id: generateId(), descricao: "", venda: null, promocao: null, limite: "" };
          columns.forEach((col, i) => {
            const val = cells[i]?.trim() ?? "";
            if (col === "venda" || col === "promocao") {
              const num = parseFloat(val.replace(",", ".").replace(/[^\d.]/g, ""));
              (row as Record<string, unknown>)[col] = isNaN(num) ? null : num;
            } else {
              (row as Record<string, unknown>)[col] = val;
            }
          });
          return row;
        });

      const rows = [...tab.rows];
      pastedRows.forEach((pr, i) => {
        if (startIndex + i < rows.length) {
          rows[startIndex + i] = pr;
        } else {
          rows.push(pr);
        }
      });
      updateTab(type, { ...tab, rows });
    },
    [getTab, updateTab]
  );

  /** Replaces all rows of a tab (used after file upload) */
  const loadRows = useCallback(
    (type: OfferType, rows: OfferRow[], newColumns?: OfferColumnConfig[]) => {
      const tab = getTab(type);
      updateTab(type, { ...tab, rows, columns: newColumns || tab.columns });
    },
    [getTab, updateTab]
  );

  /** Inserts an empty row at a specific index */
  const insertRow = useCallback(
    (type: OfferType, index: number) => {
      const tab = getTab(type);
      const newRows = [...tab.rows];
      newRows.splice(index, 0, emptyRow());
      updateTab(type, { ...tab, rows: newRows });
    },
    [getTab, updateTab]
  );

  /** Moves a row up or down */
  const moveRow = useCallback(
    (type: OfferType, index: number, direction: "up" | "down") => {
      const tab = getTab(type);
      const newRows = [...tab.rows];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      
      if (targetIndex < 0 || targetIndex >= newRows.length) return;
      
      const [moved] = newRows.splice(index, 1);
      newRows.splice(targetIndex, 0, moved);
      updateTab(type, { ...tab, rows: newRows });
    },
    [getTab, updateTab]
  );

  /** Clears all rows from a tab (resets to one empty row) */
  const clearTab = useCallback(
    (type: OfferType) => {
      const tab = getTab(type);
      updateTab(type, { ...tab, rows: [emptyRow()] });
      toast.success("Tabela limpa com sucesso.");
    },
    [getTab, updateTab]
  );

  /** Updates column definitions array (e.g. user renamed a column) */
  const setColumns = useCallback(
    (type: OfferType, columns: OfferColumnConfig[]) => {
      const tab = getTab(type);
      updateTab(type, { ...tab, columns });
    },
    [getTab, updateTab]
  );

  /** Updates the period text for a tab */
  const updatePeriod = useCallback(
    (type: OfferType, period: string) => {
      const tab = getTab(type);
      updateTab(type, { ...tab, period });
    },
    [getTab, updateTab]
  );

  /** Updates global notes */
  const updateNotes = useCallback(
    (notes: string) => {
      persist({ ...submission, notes });
    },
    [submission, persist]
  );

  /** Sends the submission — changes status and raises notification flag for Agency */
  const sendToAgency = useCallback(
    (submittedBy: string, unitId: string) => {
      const updated: OfferSubmission = {
        ...submission,
        status: "sent" as SubmissionStatus,
        submittedAt: new Date().toISOString(),
        submittedBy,
        unitId,
        receivedAt: null,
      };
      persist(updated);
      
      // Clear Manager notif, set Agency notif
      localStorage.removeItem(MGR_NOTIF_KEY);
      setHasManagerNotification(false);
      localStorage.setItem(AGENCY_NOTIF_KEY, "true");
      setHasAgencyNotification(true);
    },
    [submission, persist]
  );

  /** Agency marks the submission as received - raises notification flag for Manager */
  const markAsReceived = useCallback(() => {
    const updated: OfferSubmission = { 
      ...submission, 
      status: "received" as SubmissionStatus,
      receivedAt: new Date().toISOString(),
    };
    persist(updated);
    
    // Clear Agency notif, set Manager notif
    localStorage.removeItem(AGENCY_NOTIF_KEY);
    setHasAgencyNotification(false);
    localStorage.setItem(MGR_NOTIF_KEY, "true");
    setHasManagerNotification(true);
  }, [submission, persist]);

  /** Manager clears the receipt notification */
  const clearManagerNotification = useCallback(() => {
    localStorage.removeItem(MGR_NOTIF_KEY);
    setHasManagerNotification(false);
  }, []);

  /** Resets to a fresh draft (manager only) */
  const resetDraft = useCallback(() => {
    const fresh = emptySubmission();
    persist(fresh);
    localStorage.removeItem(AGENCY_NOTIF_KEY);
    localStorage.removeItem(MGR_NOTIF_KEY);
    setHasAgencyNotification(false);
    setHasManagerNotification(false);
  }, [persist]);

  return {
    submission,
    hasNotification: hasAgencyNotification,        // Keep existing api surface temporarily if wanted
    hasAgencyNotification,
    hasManagerNotification,
    getTab,
    updateTab,
    setColumns,
    addRow,
    removeRow,
    insertRow,
    moveRow,
    clearTab,
    updateRow,
    pasteRows,
    loadRows,
    updatePeriod,
    updateNotes,
    sendToAgency,
    markAsReceived,
    clearManagerNotification,
    resetDraft,
  };
}
