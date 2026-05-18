import { useState } from "react";
import { pkshaPrompts } from "../data/pkshaPrompts";

export default function PKSHACodilityPrepPage() {
  const [selected, setSelected] = useState(pkshaPrompts[0].id);
  const [copied, setCopied] = useState(null);

  const current = pkshaPrompts.find((prompt) => prompt.id === selected) ?? pkshaPrompts[0];

  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        color: "#e8e4dc",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #1e1e2e",
          padding: "28px 40px 20px",
          background: "linear-gradient(180deg, #0d0d18 0%, #0a0a0f 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "#DC2626",
              textTransform: "uppercase",
              marginBottom: 8,
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#DC2626",
                animation: "pulse 2s infinite",
              }}
            />
            URGENT / DEADLINE 2026-05-18
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: "normal",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
              color: "#e8e4dc",
            }}
          >
            PKSHA Codilityテスト直前対策
          </h1>
          <div
            style={{
              fontSize: 14,
              color: "#8a8aaa",
              fontFamily: "monospace",
            }}
          >
            NotebookLM音声プロンプト / 3本セット / 用途別構成
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#13131e",
          borderBottom: "1px solid #1e1e2e",
          padding: "16px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 16,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#D97706",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            戦略
          </div>
          <div style={{ fontSize: 13, color: "#a8a4ac", lineHeight: 1.6 }}>
            1本でまとめず、<span style={{ color: "#00D4FF" }}>用途別に3本</span>に分ける。
            <span style={{ color: "#7C3AED" }}>反射神経用</span>は繰り返し聞き、
            <span style={{ color: "#DC2626" }}>直前用</span>は儀式として開始30分前に1回だけ聞く。
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "20px 40px 0",
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {pkshaPrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => setSelected(prompt.id)}
            style={{
              padding: "12px 18px",
              background: selected === prompt.id ? "#13131e" : "transparent",
              border: "1px solid #1e1e2e",
              borderBottom:
                selected === prompt.id ? `2px solid ${prompt.color}` : "1px solid #1e1e2e",
              color: selected === prompt.id ? "#e8e4dc" : "#6a6a8a",
              fontSize: 12,
              fontFamily: "monospace",
              cursor: "pointer",
              letterSpacing: "0.05em",
              flex: "1 1 280px",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: prompt.color,
                letterSpacing: "0.2em",
                marginBottom: 4,
              }}
            >
              {prompt.badge}
            </div>
            <div>{prompt.title.split("：")[0]}</div>
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 60px" }}>
        <div
          style={{
            background: "#13131e",
            border: `1px solid ${current.color}33`,
            borderRadius: 4,
            padding: "24px 28px",
            marginBottom: 20,
            marginTop: -1,
            borderTop: `2px solid ${current.color}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 24,
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#4a4a6a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                  fontFamily: "monospace",
                }}
              >
                想定時間
              </div>
              <div style={{ fontSize: 14, color: "#e8e4dc" }}>{current.duration}</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#4a4a6a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                  fontFamily: "monospace",
                }}
              >
                聞くタイミング
              </div>
              <div style={{ fontSize: 14, color: "#e8e4dc" }}>{current.when}</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: "#4a4a6a",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                  fontFamily: "monospace",
                }}
              >
                目的
              </div>
              <div style={{ fontSize: 14, color: "#e8e4dc" }}>{current.purpose}</div>
            </div>
          </div>

          <h2
            style={{
              fontSize: 20,
              fontWeight: "normal",
              margin: 0,
              color: "#e8e4dc",
              letterSpacing: "-0.01em",
            }}
          >
            {current.title}
          </h2>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "#4a4a6a",
                fontFamily: "monospace",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              NotebookLMカスタム指示プロンプト
            </span>
            <button
              onClick={() => handleCopy(current.prompt, current.id)}
              style={{
                background: copied === current.id ? "#059669" : current.color,
                border: "none",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 2,
                fontSize: 11,
                fontFamily: "monospace",
                cursor: "pointer",
                letterSpacing: "0.15em",
                transition: "all 0.2s",
                fontWeight: 600,
              }}
            >
              {copied === current.id ? "COPIED" : "COPY PROMPT"}
            </button>
          </div>
          <div
            style={{
              background: "#0d0d18",
              border: "1px solid #1e1e2e",
              borderRadius: 4,
              padding: "22px 26px",
              fontSize: 13.5,
              lineHeight: 1.85,
              color: "#c8c4bc",
              whiteSpace: "pre-wrap",
              fontFamily: "'Georgia', serif",
            }}
          >
            {current.prompt}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#3a3a5a",
              fontFamily: "monospace",
              textAlign: "right",
              marginTop: 8,
            }}
          >
            {current.chars} 文字
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            padding: "20px 24px",
            background: "#0d0d18",
            border: "1px solid #1e1e2e",
            borderRadius: 4,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#D97706",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: "monospace",
            }}
          >
            使い方のおすすめ
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <div>
              <div style={{ color: "#00D4FF", marginBottom: 6, fontWeight: 600, fontSize: 12 }}>
                ① 今夜（5/17）
              </div>
              <div style={{ color: "#a8a4ac" }}>
                MAINプロンプトで音声生成。
                <br />
                じっくり1回通して聞く。
                <br />
                出題予測の根拠を頭に入れる。
              </div>
            </div>
            <div>
              <div style={{ color: "#7C3AED", marginBottom: 6, fontWeight: 600, fontSize: 12 }}>
                ② 5/18朝〜直前まで
              </div>
              <div style={{ color: "#a8a4ac" }}>
                DRILLプロンプトで音声生成。
                <br />
                移動中・歩きながら2-3回。
                <br />
                パターン認識を反射に変える。
              </div>
            </div>
            <div>
              <div style={{ color: "#DC2626", marginBottom: 6, fontWeight: 600, fontSize: 12 }}>
                ③ テスト30分前
              </div>
              <div style={{ color: "#a8a4ac" }}>
                LAST MILEプロンプトで音声生成。
                <br />
                1回だけ聞く。
                <br />
                落ち着いて入る儀式にする。
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 20,
            padding: "20px 24px",
            background: "#1a0d0d",
            border: "1px solid #DC262644",
            borderRadius: 4,
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#DC2626",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: "monospace",
            }}
          >
            守るべきこと
          </div>
          <div style={{ fontSize: 13, color: "#c8c4bc", lineHeight: 1.9 }}>
            ・テストリンクは開始前に絶対に開かない（アクセスログが残る可能性）
            <br />
            ・本番中、生成AI・Copilot・外部検索は使わない（過程が記録されている）
            <br />
            ・5/18（月）中にテスト＋レジュメ提出を完了させる
            <br />
            ・完成コードを突然貼らない。考えながら書く流れを残す
          </div>
        </div>
      </div>
    </div>
  );
}
