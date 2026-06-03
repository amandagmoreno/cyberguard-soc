import {
  Activity,
  AlertTriangle,
  Bot,
  Crosshair,
  Shield,
  Globe,
  TrendingUp,
  Radio,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  badgeColor?: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Painel",
    href: "/dashboard",
    icon: Activity,
    badge: undefined,
  },
  {
    label: "Incidentes",
    href: "/incidents",
    icon: AlertTriangle,
    badge: 4,
    badgeColor: "#EF4444",
  },
  {
    label: "Agentes de IA",
    href: "/ai-agents",
    icon: Bot,
    badge: undefined,
  },
  {
    label: "Inteligência de Ameaças",
    href: "/threat-intel",
    icon: Crosshair,
    badge: 12,
    badgeColor: "#F97316",
  },
  {
    label: "MITRE ATT&CK",
    href: "/mitre-attack",
    icon: Shield,
    badge: undefined,
  },
  {
    label: "Endpoints",
    href: "/endpoints",
    icon: Globe,
    badge: 2,
    badgeColor: "#EAB308",
  },
  {
    label: "Linha do Tempo",
    href: "/timeline",
    icon: TrendingUp,
    badge: undefined,
  },
  {
    label: "Relatórios",
    href: "/reports",
    icon: Radio,
    badge: undefined,
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    badge: undefined,
  },
];
