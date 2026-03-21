import {
  LayoutDashboard,
  Tag,
  PlusCircle,
  History,
  Package,
  BarChart3,
  SendHorizontal,
  CalendarDays,
  Ticket,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Promoções",
    href: "/admin/promocoes",
    icon: Tag,
    children: [
      { label: "Nova Promoção", href: "/admin/promocoes/nova", icon: Tag },
      { label: "Criar Cupom", href: "/admin/promocoes/criar-cupom", icon: Ticket },
      { label: "Histórico", href: "/admin/promocoes/historico", icon: History },
    ],
  },
  {
    label: "Planejamento",
    href: "/admin/planejamento",
    icon: SendHorizontal,
    children: [
      { label: "Plan. Semanal", href: "/admin/planejamento/programacao-semanal", icon: CalendarDays },
      { label: "Plan. Mensal", href: "/admin/planejamento/programacao-mensal", icon: CalendarDays },
    ],
  },
  {
    label: "Produtos",
    href: "/admin/produtos",
    icon: Package,
    children: [
      { label: "Novo Produto", href: "/admin/produtos/novo", icon: PlusCircle },
    ],
  },
  {
    label: "Análises",
    href: "/admin/analises",
    icon: BarChart3,
  },
] as const;

export type SidebarItemConfig = typeof SIDEBAR_ITEMS[number];
