"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getThreads, getReplies, formatDate, renderContent, type Thread, type Reply } from "../data";

export default function ThreadPage() {
  const params = useParams();
  const threadId = params.threadId as string;

  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const threads = getThreads();
    const found = threads.find((t) => t.id === threadId);
    setThread(found || null);
    setReplies(getReplies(threadId));
  }, [threadId]);

  function handleReply(e: React.FormEvent) {
    e.preventDefault();
    setShowError(true);
  }

  if (!thread) {
    return (
      <>
        <div className="board-header">
          <div className="board-title">/5ch/ - 5chan</div>
          <div className="board-subtitle">Foro anonimo de Los Santos y alrededores</div>
        </div>
        <div className="board-nav">
          <div>
            [<Link href="/foro">Volver</Link>]
          </div>
        </div>
        <div style={{ padding: 20, textAlign: "center" }}>
          Hilo no encontrado. <Link href="/foro" className="back-link">[Volver al catalogo]</Link>
        </div>
      </>
    );
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
          [<Link href="/foro">Catalogo</Link>]
          {" "}
          [<Link href="/desguace">Desguace</Link>]
          {" "}
          [<Link href="/wallet">Wallet</Link>]
        </div>
        <div>
          [<a href="#reply-form">Responder</a>]
        </div>
      </div>

      {/* Reply form (top) */}
      <div className="post-form-container">
        <form onSubmit={handleReply}>
          <div className="post-form" style={{ marginTop: 8, marginBottom: 8 }}>
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
                      Responder
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>

      <hr className="thread-separator" />

      {/* OP */}
      <div className="thread-container">
        <div className="post post-op">
          <div className="post-info">
            <span className="post-subject">{thread.title}</span>
            {" "}
            <span className="post-name">{thread.author}</span>
            {" "}
            <span className="post-date">{formatDate(thread.createdAt)}</span>
            {" "}
            <span className="post-number">No.{thread.id}</span>
          </div>
          <div className="post-content">
            {renderContent(thread.content).map((line) => (
              <div key={line.key} className={line.isGreentext ? "greentext" : undefined}>
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="thread-container">
        {replies.map((reply) => {
          const isOp = reply.author === thread.author;
          return (
          <div key={reply.id} className={`post ${isOp ? "post-reply-op" : "post-reply"}`}>
            <div className="post-info">
              <span className="post-name">{reply.author}</span>
              {isOp && <span className="op-tag">OP</span>}
              {" "}
              <span className="post-date">{formatDate(reply.createdAt)}</span>
              {" "}
              <span className="post-number">No.{reply.id}</span>
            </div>
            <div className="post-content">
              {renderContent(reply.content).map((line) => (
                <div key={line.key} className={line.isGreentext ? "greentext" : undefined}>
                  {line.text}
                </div>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      <hr className="thread-separator" />

      {/* Bottom form anchor */}
      <div id="reply-form" className="post-form-container" style={{ padding: "8px 0" }}>
        <span style={{ fontSize: 14, color: "#666" }}>
          {replies.length} {replies.length === 1 ? "respuesta" : "respuestas"} en este hilo.
        </span>
      </div>

      {/* Footer */}
      <div className="board-footer">
        5chan - Foro anonimo de Los Santos<br />
        Todos los derechos reservados... o no.
      </div>
    </>
  );
}
