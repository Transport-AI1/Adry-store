"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Bot, MessageCircle, RotateCcw, X } from "lucide-react";

const suggestions = ["¿Dónde estáis?", "¿Puedo comprar ahora?", "¿Las fotos son reales?"];

export function FaqAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const isBusy = status === "submitted" || status === "streaming";

  function submitMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="faq-assistant-root">
      {isOpen && (
        <section className="faq-panel" aria-label="Asistente de ADRY STORE">
          <header className="faq-header">
            <div className="faq-avatar"><Bot aria-hidden="true" /></div>
            <div className="faq-heading"><strong>Asistente ADRY</strong><span><i /> Aquí para ayudarte</span></div>
            <button className="faq-icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar asistente"><X /></button>
          </header>
          <div className="faq-messages" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="faq-welcome">
                <span className="faq-eyebrow">ADRY STORE · RIVAS-VACIAMADRID</span>
                <h2>¡Hola! ¿En qué puedo ayudarte?</h2>
                <p>Puedo orientarte sobre la tienda y aclarar qué información es provisional.</p>
                <div className="faq-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => submitMessage(suggestion)}>{suggestion}</button>)}</div>
              </div>
            ) : (
              messages.map((message) => {
                const text = message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");
                if (!text) return null;
                return <div className={`faq-message ${message.role === "user" ? "faq-user-message" : "faq-ai-message"}`} key={message.id}><span>{message.role === "user" ? "Tú" : "ADRY"}</span><p>{text}</p></div>;
              })
            )}
            {isBusy && <div className="faq-thinking" role="status"><span /><span /><span /><span className="sr-only">El asistente está pensando</span></div>}
            {error && <div className="faq-error" role="alert">El asistente no está disponible todavía. Vuelve a intentarlo más tarde.</div>}
          </div>
          {error && <button className="faq-retry" type="button" onClick={() => regenerate()}>Intentar otra vez <RotateCcw /></button>}
          <div className="faq-composer-wrap">
            <form className="faq-composer" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
              <label className="sr-only" htmlFor="faq-message">Escribe tu pregunta</label>
              <input id="faq-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Escribe tu pregunta…" maxLength={1000} disabled={isBusy} />
              <button type="submit" aria-label="Enviar pregunta" disabled={!input.trim() || isBusy}><ArrowUp /></button>
            </form>
            <p>Respuestas generadas con IA. Confirma con la tienda los detalles importantes.</p>
          </div>
        </section>
      )}
      <button className={`faq-launcher ${isOpen ? "is-open" : ""}`} type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente de ADRY STORE"}>
        {isOpen ? <X aria-hidden="true" /> : <><MessageCircle aria-hidden="true" /><span>¿Te ayudamos?</span></>}
      </button>
    </div>
  );
}
