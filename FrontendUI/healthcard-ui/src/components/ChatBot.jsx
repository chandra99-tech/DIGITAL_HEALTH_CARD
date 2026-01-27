import 'whatwg-fetch';
import { useState, useRef } from "react";

// Use local proxy endpoint
async function fetchChatbotReply(message) {
  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });
  const data = await response.json();
  return data.reply;
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const reply = await fetchChatbotReply(input);
      setMessages((msgs) => [...msgs, { from: "bot", text: reply }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Error contacting chatbot." }]);
    }
    setLoading(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 340,
      maxHeight: 500,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      display: "flex",
      flexDirection: "column",
      zIndex: 9999,
      fontFamily: "'Inter', system-ui, sans-serif"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: "16px 20px",
        color: "#2d3748",
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: 1
      }}>
        💬 AarogyaCard Chatbot
      </div>
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        background: "#f8fafc"
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            marginBottom: 12,
            textAlign: msg.from === "user" ? "right" : "left"
          }}>
            <span style={{
              display: "inline-block",
              background: msg.from === "user" ? "#a8edea" : "#fed6e3",
              color: "#2d3748",
              borderRadius: 12,
              padding: "8px 14px",
              maxWidth: "80%",
              fontSize: 15,
              boxShadow: msg.from === "user" ? "0 2px 8px #a8edea33" : "0 2px 8px #fed6e333"
            }}>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} style={{
        display: "flex",
        borderTop: "1px solid #e2e8f0",
        background: "#fff",
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "14px 16px",
            fontSize: 15,
            borderBottomLeftRadius: 16,
            background: "#fff"
          }}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            background: loading ? "#a0aec0" : "#a8edea",
            color: "#fff",
            border: "none",
            borderBottomRightRadius: 16,
            padding: "0 22px",
            fontWeight: 600,
            fontSize: 15,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s"
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
