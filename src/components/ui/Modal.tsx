"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

/* ── Modal Root ── */
interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function ModalRoot({ isOpen, onClose, children }: ModalRootProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return <>{children}</>;
}

/* ── Overlay ── */
interface ModalOverlayProps {
  onClose: () => void;
}

function ModalOverlay({ onClose }: ModalOverlayProps) {
  return (
    <div
      className="Modal-Overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

/* ── Content ── */
type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:w-[400px] sm:max-h-[480px]",
  md: "sm:w-[480px] sm:max-h-[560px]",
  lg: "sm:w-[600px] sm:max-h-[640px]",
  xl: "sm:w-[760px] sm:max-h-[640px]",
};

interface ModalContentProps {
  children: ReactNode;
  size?: ModalSize;
  className?: string;
}

function ModalContent({
  children,
  size = "md",
  className = "",
}: ModalContentProps) {
  return (
    <div
      className={`
        Modal-Conteúdo fixed inset-4
        sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2
        z-[90] bg-[var(--surface)] rounded-2xl shadow-2xl
        border border-[var(--border)]
        flex flex-col overflow-hidden
        ${sizeClasses[size]}
        ${className}
      `}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}

/* ── Header ── */
interface ModalHeaderProps {
  children: ReactNode;
  icon?: ReactNode;
  onClose: () => void;
}

function ModalHeader({ children, icon, onClose }: ModalHeaderProps) {
  return (
    <div className="Modal-Cabeçalho flex items-center justify-between p-5 border-b border-[var(--border)]">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-[var(--color-primary)]">{icon}</span>
        )}
        <h2 className="text-lg font-bold">{children}</h2>
      </div>
      <button
        onClick={onClose}
        className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-lg"
        aria-label="Fechar"
      >
        <X size={20} />
      </button>
    </div>
  );
}

/* ── Body ── */
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

function ModalBody({ children, className = "" }: ModalBodyProps) {
  return (
    <div
      className={`Modal-Corpo flex-1 overflow-y-auto scrollbar-styled p-5 ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Compound Export ── */
const Modal = Object.assign(ModalRoot, {
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Body: ModalBody,
});

export {
  Modal,
  ModalRoot,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  type ModalSize,
};
