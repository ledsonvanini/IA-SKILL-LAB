"use client";

import { useState } from "react";
import { Briefcase, Send, User, Phone, Mail, FileText } from "lucide-react";
import { Button, Input, Modal } from "@/components/ui";

interface WorkWithUsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center mx-auto mb-4">
        <Send size={28} className="text-[var(--color-primary)]" />
      </div>
      <h3 className="text-xl font-bold mb-2">Candidatura Enviada!</h3>
      <p className="text-sm text-[var(--muted)] mb-6">
        Obrigado pelo interesse. Analisaremos seu perfil e entraremos em
        contato em breve.
      </p>
      <Button variant="primary" onClick={onClose}>
        Fechar
      </Button>
    </div>
  );
}

const AREA_OPTIONS = [
  { value: "", label: "Selecione uma área" },
  { value: "caixa", label: "Operador de Caixa" },
  { value: "repositor", label: "Repositor" },
  { value: "acougue", label: "Açougue" },
  { value: "padaria", label: "Padaria" },
  { value: "hortifruti", label: "Hortifruti" },
  { value: "administrativo", label: "Administrativo" },
  { value: "logistica", label: "Logística" },
  { value: "outro", label: "Outro" },
];

export function WorkWithUsPopover({
  isOpen,
  onClose,
}: WorkWithUsPopoverProps) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay onClose={onClose} />
      <Modal.Content size="md">
        <Modal.Header icon={<Briefcase size={20} />} onClose={onClose}>
          Trabalhe Conosco
        </Modal.Header>

        {sent ? (
          <SuccessView onClose={onClose} />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto scrollbar-styled p-5 space-y-4"
          >
            <p className="text-sm text-[var(--muted)]">
              Faça parte do time Meta21! Preencha o formulário abaixo.
            </p>

            <Input
              label="Nome completo"
              id="wku-name"
              required
              placeholder="Seu nome"
              icon={<User size={14} />}
            />

            <Input
              label="E-mail"
              id="wku-email"
              type="email"
              required
              placeholder="seu@email.com"
              icon={<Mail size={14} />}
            />

            <Input
              label="Telefone"
              id="wku-phone"
              type="tel"
              required
              placeholder="(11) 99999-0000"
              icon={<Phone size={14} />}
            />

            <div className="Campo-Input flex flex-col gap-1.5">
              <label
                htmlFor="wku-area"
                className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5"
              >
                <Briefcase
                  size={14}
                  className="text-[var(--color-primary)]"
                />
                Área de interesse
              </label>
              <select
                id="wku-area"
                required
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)]"
              >
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="Campo-Input flex flex-col gap-1.5">
              <label
                htmlFor="wku-message"
                className="text-sm font-semibold text-[var(--foreground)] flex items-center gap-1.5"
              >
                <FileText
                  size={14}
                  className="text-[var(--color-primary)]"
                />
                Por que quer trabalhar conosco?
              </label>
              <textarea
                id="wku-message"
                rows={3}
                className="block w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/40 focus:border-[var(--color-primary)] resize-none"
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
      </Modal.Content>
    </Modal>
  );
}
