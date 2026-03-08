"use client";

import { useState } from "react";
import { X, Briefcase, Send, User, Phone, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui";

interface WorkWithUsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkWithUsPopover({ isOpen, onClose }: WorkWithUsPopoverProps) {
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="Popover-TrabalheConosco fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[90] bg-[var(--surface)] rounded-2xl shadow-2xl border border-[var(--border)] sm:w-[480px] sm:max-h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-[var(--color-primary)]" />
            <h2 className="text-lg font-bold">Trabalhe Conosco</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-lg"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-[var(--color-primary)]" />
            </div>
            <h3 className="text-xl font-bold mb-2">
              Candidatura Enviada!
            </h3>
            <p className="text-sm text-[var(--muted)] mb-6">
              Obrigado pelo interesse. Analisaremos seu perfil e entraremos
              em contato em breve.
            </p>
            <Button variant="primary" onClick={onClose}>
              Fechar
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto scrollbar-styled p-5 space-y-4"
          >
            <p className="text-sm text-[var(--muted)]">
              Faça parte do time Meta21! Preencha o formulário abaixo.
            </p>

            <div>
              <label
                htmlFor="wku-name"
                className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-1.5"
              >
                <User size={14} className="text-[var(--color-primary)]" />
                Nome completo
              </label>
              <input
                id="wku-name"
                type="text"
                required
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label
                htmlFor="wku-email"
                className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-1.5"
              >
                <Mail size={14} className="text-[var(--color-primary)]" />
                E-mail
              </label>
              <input
                id="wku-email"
                type="email"
                required
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="wku-phone"
                className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-1.5"
              >
                <Phone size={14} className="text-[var(--color-primary)]" />
                Telefone
              </label>
              <input
                id="wku-phone"
                type="tel"
                required
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
                placeholder="(11) 99999-0000"
              />
            </div>

            <div>
              <label
                htmlFor="wku-area"
                className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-1.5"
              >
                <Briefcase size={14} className="text-[var(--color-primary)]" />
                Área de interesse
              </label>
              <select
                id="wku-area"
                required
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
              >
                <option value="">Selecione uma área</option>
                <option value="caixa">Operador de Caixa</option>
                <option value="repositor">Repositor</option>
                <option value="acougue">Açougue</option>
                <option value="padaria">Padaria</option>
                <option value="hortifruti">Hortifruti</option>
                <option value="administrativo">Administrativo</option>
                <option value="logistica">Logística</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="wku-message"
                className="text-sm font-semibold text-[var(--foreground)] mb-1.5 flex items-center gap-1.5"
              >
                <FileText size={14} className="text-[var(--color-primary)]" />
                Por que quer trabalhar conosco?
              </label>
              <textarea
                id="wku-message"
                rows={3}
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
            >
              <Send size={16} />
              Enviar Candidatura
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
