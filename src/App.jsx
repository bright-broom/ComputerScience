import { useState } from "react";
import ComputerScienceSeriesPage from "./pages/ComputerScienceSeriesPage";
import PKSHACodilityPrepPage from "./pages/PKSHACodilityPrepPage";

const workspaces = [
  {
    id: "cs",
    label: "CSシリーズ",
    title: "応用Computer Science",
    description: "長期学習向けの NotebookLM プロンプト集",
    color: "#00D4FF",
  },
  {
    id: "pksha",
    label: "PKSHA直前対策",
    title: "Codility テスト準備",
    description: "直前 3 本セットの対策プロンプト",
    color: "#DC2626",
  },
];

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState("cs");

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(12px)",
          background: "#0a0a0fcc",
          borderBottom: "1px solid #1e1e2e",
          padding: "14px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: "#4a4a6a",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "monospace",
                marginBottom: 4,
              }}
            >
              Prompt Workspace
            </div>
            <div style={{ color: "#d6d1c7", fontSize: 14 }}>
              学習用と直前対策用を分けて管理
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {workspaces.map((workspace) => (
              <button
                key={workspace.id}
                onClick={() => setActiveWorkspace(workspace.id)}
                style={{
                  minWidth: 220,
                  padding: "10px 14px",
                  borderRadius: 4,
                  border:
                    activeWorkspace === workspace.id
                      ? `1px solid ${workspace.color}`
                      : "1px solid #1e1e2e",
                  background:
                    activeWorkspace === workspace.id
                      ? `${workspace.color}18`
                      : "transparent",
                  color: activeWorkspace === workspace.id ? "#f3efe8" : "#8a8aaa",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                    color: workspace.color,
                    marginBottom: 4,
                  }}
                >
                  {workspace.label}
                </div>
                <div style={{ fontSize: 13, marginBottom: 2 }}>{workspace.title}</div>
                <div style={{ fontSize: 11, color: "#6f6f8f" }}>{workspace.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {activeWorkspace === "cs" ? <ComputerScienceSeriesPage /> : <PKSHACodilityPrepPage />}
    </>
  );
}
