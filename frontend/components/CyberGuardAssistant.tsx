"use client";

import { useEffect, useState } from "react";

export default function CyberGuardAssistant() {

  const [open, setOpen] = useState(false);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Olá. Sou o CyberGuard AI Assistant. Como posso ajudar?"
    }
  ]);

  useEffect(() => {

    const handler = () => {
      setOpen(true);
    };

    window.addEventListener(
      "open-cyberguard-ai",
      handler
    );

    return () =>
      window.removeEventListener(
        "open-cyberguard-ai",
        handler
      );

  }, []);

  async function sendMessage() {

    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        content: currentQuestion
      }
    ]);

    setQuestion("");

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            question: currentQuestion
          })
        }
      );

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: data.response
        }
      ]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content:
            "Erro ao conectar ao CyberGuard AI."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }

  if (!open) return null;

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 460,
        height: "100vh",
        background: "#111827",
        borderLeft: "1px solid #2a2f3a",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column"
      }}
    >

      <div
        style={{
          padding: 16,
          borderBottom:
            "1px solid #2a2f3a",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >

        <div>

          <div
            style={{
              fontWeight: 700,
              fontSize: 14
            }}
          >
            CyberGuard AI Assistant
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#8b5cf6"
            }}
          >
            Powered by Llama 3
          </div>

        </div>

        <button
          onClick={() =>
            setOpen(false)
          }
        >
          ✕
        </button>

      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16
        }}
      >

        {messages.map((msg, i) => (

          <div
            key={i}
            style={{
              marginBottom: 16
            }}
          >

            <strong>
              {msg.role === "user"
                ? "Você"
                : "AI"}
            </strong>

            <div
              style={{
                marginTop: 4,
                whiteSpace:
                  "pre-wrap"
              }}
            >
              {msg.content}
            </div>

          </div>

        ))}

      </div>

      <div
        style={{
          padding: 16,
          borderTop:
            "1px solid #2a2f3a",
          display: "flex",
          gap: 8
        }}
      >

        <input
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="Pergunte algo..."
          style={{
            flex: 1,
            padding: 10
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading
            ? "..."
            : "Enviar"}
        </button>

      </div>

    </div>

  );

}