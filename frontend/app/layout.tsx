import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import CyberGuardAssistant from "@/components/CyberGuardAssistant";
import { T } from "@/lib/tokens";

export const metadata: Metadata = {
  title:
    "CyberGuard - Plataforma Inteligente de Monitoramento em Cibersegurança",
  description:
    "AI-driven threat detection and orchestration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body
        style={{
          margin: 0,
          background: T.bg0,
        }}
      >

        <div
          style={{
            display: "flex",
            minHeight: "100vh",
          }}
        >

          {/* Sidebar */}
          <Sidebar />

          {/* Content */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minWidth: 0,
            }}
          >

            <Topbar />

            <main
              style={{
                flex: 1,
                overflow: "auto",
              }}
            >
              {children}
            </main>

          </div>

        </div>

        {/* CyberGuard AI Assistant */}
        <CyberGuardAssistant />

      </body>

    </html>

  );

}
