"use client";

import { useState } from "react";

export default function AIAssistantPage() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content:
        "Olá. Sou o CyberGuard AI. Como posso ajudar?"
    }
  ]);

  async function sendMessage() {

    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      content: question
    };

    setMessages(prev => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");
    setLoading(true);

    try {

      const response = await fetch(
        "https://cyberguard-soc-e6si.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
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
            "Erro ao conectar com o CyberGuard AI."
        }
      ]);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div
      style={{
        padding: 24,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}
    >

      <h1>
        CyberGuard AI Assistant
      </h1>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap"
        }}
      >

        <button
          onClick={() =>
            setQuestion(
              "Qual é a ameaça mais crítica atualmente?"
            )
          }
        >
          Ameaça Crítica
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Explique a técnica T1110"
            )
          }
        >
          MITRE T1110
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Como responder a uma exfiltração de dados?"
            )
          }
        >
          Playbook
        </button>

      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #333",
          borderRadius: 12,
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
                : "CyberGuard AI"}
            </strong>

            <div
              style={{
                marginTop: 4,
                whiteSpace: "pre-wrap"
              }}
            >
              {msg.content}
            </div>

          </div>

        ))}

      </div>

      <div
        style={{
          display: "flex",
          gap: 8
        }}
      >

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Digite sua pergunta..."
          style={{
            flex: 1,
            padding: 12
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Pensando..." : "Enviar"}
        </button>

      </div>

    </div>

  );

}