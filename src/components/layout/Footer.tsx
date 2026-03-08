"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  Instagram,
  Facebook,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Input, Button } from "@/components/ui";

interface FooterProps {
  onShowUnits: () => void;
  onShowWorkWithUs: () => void;
}

export function Footer({ onShowUnits, onShowWorkWithUs }: FooterProps) {
  return (
    <footer className="Rodapé border-t border-[var(--border)] bg-[var(--surface)] hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Col 1 — Marca */}
          <div>
            <div className="flex items-center gap-2 text-[var(--color-primary)] mb-4">
              <span className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white text-sm font-black">
                M
              </span>
              <span className="text-lg font-black tracking-tight uppercase">
                Meta21
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
              O melhor do seu dia a dia está aqui. Qualidade, preço justo e
              atendimento que você merece.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--muted)] flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[var(--border)] text-[var(--muted)] flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Col 2 — Institucional */}
          <div>
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Institucional
            </h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li>
                <Link
                  href="#"
                  className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={12} /> Sobre o Meta21
                </Link>
              </li>
              <li>
                <button
                  onClick={onShowUnits}
                  className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={12} /> Nossas Lojas
                </button>
              </li>
              <li>
                <button
                  onClick={onShowWorkWithUs}
                  className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={12} /> Trabalhe Conosco
                </button>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1"
                >
                  <ChevronRight size={12} /> Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Atendimento */}
          <div>
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Atendimento
            </h4>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[var(--color-primary)]" />
                (11) 3456-7890
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle
                  size={14}
                  className="text-[var(--color-primary)]"
                />
                <a
                  href="https://wa.me/5511987654321?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20o%20Meta21."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  (11) 98765-4321
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[var(--color-primary)]" />
                contato@meta21.com.br
              </li>
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider mb-4">
              Receba Ofertas
            </h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              Cadastre seu e-mail e receba as melhores promoções.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Seu e-mail"
                type="email"
                aria-label="E-mail para newsletter"
              />
              <Button variant="primary" size="md">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--muted)]">
          <p>© 2026 META21 Supermercados. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Termos de Uso
            </Link>
            <Link
              href="#"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
