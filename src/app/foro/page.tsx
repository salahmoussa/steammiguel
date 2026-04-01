"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { DEFAULT_THREADS, getThreads, formatDate, renderContent, type Thread } from "./data";

export default function ForoPage() {
  const [threads, setThreads] = useState<Thread[]>(DEFAULT_THREADS);
  const [showForm, setShowForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(14);

  useEffect(() => {
    setThreads(getThreads());
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(23, prev + delta));
      });
    }, 15000 + Math.random() * 15000);
    return () => clearInterval(interval);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShowError(true);
  }

  return (
    <>
      {/* Error modal */}
      {showError && (
        <div className="error-overlay" onClick={() => setShowError(false)}>
          <div className="error-modal" onClick={(e) => e.stopPropagation()}>
            <div className="error-modal-title">Error de conexion</div>
            <div className="error-modal-text">
              5chan esta experimentando problemas tecnicos en estos momentos. No es posible enviar formularios ni publicar contenido.<br /><br />
              Disculpa las molestias. Intentalo de nuevo mas tarde.
            </div>
            <button className="error-modal-btn" onClick={() => setShowError(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="board-header">
        <div className="board-title">/5ch/ - 5chan</div>
        <div className="board-subtitle">Foro anonimo de Los Santos y alrededores</div>
      </div>

      {/* Nav */}
      <div className="board-nav">
        <div>
          [<Link href="/">Inicio</Link>]
          {" "}
          [<Link href="/desguace">Desguace</Link>]
          {" "}
          [<Link href="/wallet">Wallet</Link>]
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#707070", fontSize: 12 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#117743", marginRight: 4, verticalAlign: "middle" }} />
            {onlineUsers} usuarios activos
          </span>
          [<Link href="/foro">Catalogo</Link>]
        </div>
      </div>

      {/* Post form */}
      <div className="post-form-container">
        <button className="post-form-toggle" onClick={() => setShowForm(!showForm)}>
          [{showForm ? "Cerrar formulario" : "Abrir formulario"}]
        </button>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="post-form" style={{ marginTop: 8 }}>
              <table>
                <tbody>
                  <tr>
                    <td>Nombre</td>
                    <td>
                      <input
                        type="text"
                        placeholder="Anonymous"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Asunto</td>
                    <td>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Comentario</td>
                    <td>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center", background: "transparent", padding: 4 }}>
                      <button type="submit" className="post-form-submit">
                        Publicar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        )}
      </div>

      <hr className="thread-separator" />

      {/* Threads */}
      {threads.map((thread, i) => (
        <div key={thread.id}>
          <div className={thread.sticky ? "thread-container sticky-container" : "thread-container"}>
            <div className="post post-op">
              <div className="post-info">
                {thread.sticky && <span className="sticky-badge">DESTACADO</span>}
                {thread.id === "11" && <span style={{ display: "inline-block", background: "#CC1105", color: "#fff", fontSize: 10, fontWeight: "bold", padding: "1px 5px", marginRight: 6, verticalAlign: "middle", letterSpacing: 0.5, animation: "pulse-dot 2s ease-in-out infinite" }}>NUEVO</span>}
                <Link href={`/foro/${thread.id}`} className="post-subject">{thread.title}</Link>
                {" "}
                <span className="post-name">{thread.author}</span>
                {" "}
                <span className="post-date">{formatDate(thread.createdAt)}</span>
                {" "}
                <span className="post-number">No.{thread.id}</span>
                {" "}
                <Link href={`/foro/${thread.id}`} className="reply-link">
                  [Responder]
                </Link>
              </div>
              <div className="post-content">
                {renderContent(thread.content).map((line) => (
                  <div key={line.key} className={line.isGreentext ? "greentext" : undefined}>
                    {line.text}
                  </div>
                ))}
              </div>
            </div>
            {thread.replies > 0 && (
              <div className="thread-stats">
                {thread.replies} {thread.replies === 1 ? "respuesta" : "respuestas"} omitidas. <Link href={`/foro/${thread.id}`} style={{ color: "#800000" }}>Click para ver el hilo completo.</Link>
              </div>
            )}
          </div>
          {i < threads.length - 1 && <hr className="thread-separator" />}
        </div>
      ))}

      <hr className="thread-separator" />

      {/* Footer */}
      <div className="board-footer">
        5chan - Foro anonimo de Los Santos<br />
        Todos los derechos reservados... o no.
      </div>
    </>
  );
}
