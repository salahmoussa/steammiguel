import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5chan - Foro de Los Santos",
};

export default function ForoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="foro-yotsuba">
      <style>{`
        .foro-yotsuba {
          background-color: #FFFFEE;
          color: #000;
          min-height: 100vh;
          font-family: arial, helvetica, sans-serif;
          font-size: 16px;
        }

        /* Board header */
        .board-header {
          background-color: #AF0A0F;
          background-image: linear-gradient(to bottom, #AF0A0F, #7B0A0E);
          text-align: center;
          padding: 14px 0;
          border-bottom: 2px solid #5A0A0A;
        }
        .board-title {
          color: #fff;
          font-size: 32px;
          font-weight: bold;
          font-family: Tahoma, sans-serif;
          letter-spacing: -1px;
        }
        .board-subtitle {
          color: #FFD6D6;
          font-size: 13px;
          margin-top: 2px;
          font-style: italic;
        }

        /* Navigation bar */
        .board-nav {
          background-color: #F0E0D6;
          border-bottom: 1px solid #D9BFB7;
          padding: 4px 8px;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .board-nav a {
          color: #800000;
          text-decoration: none;
        }
        .board-nav a:hover {
          color: #E00000;
          text-decoration: underline;
        }

        /* Post form */
        .post-form-container {
          text-align: center;
          margin: 8px 0;
        }
        .post-form-toggle {
          color: #800000;
          text-decoration: underline;
          cursor: pointer;
          font-size: 16px;
          background: none;
          border: none;
          font-family: inherit;
        }
        .post-form-toggle:hover {
          color: #E00000;
        }
        .post-form {
          display: inline-block;
          margin: 8px auto;
          background-color: #F0E0D6;
          border: 1px solid #D9BFB7;
        }
        .post-form table {
          border-spacing: 1px;
        }
        .post-form td:first-child {
          background-color: #EA8;
          color: #800;
          font-weight: bold;
          font-size: 14px;
          padding: 4px 8px;
          text-align: left;
        }
        .post-form input[type="text"],
        .post-form textarea {
          border: 1px solid #AAA;
          font-family: arial, helvetica, sans-serif;
          font-size: 15px;
          padding: 4px 6px;
          outline: none;
          background: #fff;
          color: #000;
          width: 300px;
        }
        .post-form textarea {
          width: 300px;
          height: 120px;
          resize: vertical;
        }
        .post-form-submit {
          background-color: #F0E0D6;
          border: 1px solid #C0A69A;
          cursor: pointer;
          font-size: 15px;
          font-family: inherit;
          padding: 4px 12px;
          color: #800000;
        }
        .post-form-submit:hover {
          background-color: #E8D6CC;
        }

        /* Thread / Post */
        .thread-separator {
          border: none;
          border-top: 1px solid #D9BFB7;
          margin: 0;
        }
        .thread-container {
          margin: 0;
          padding: 6px 12px;
          border-left: 3px solid transparent;
          transition: border-color 0.2s;
        }
        .thread-container:hover {
          border-left-color: #800000;
        }

        .post {
          display: inline-block;
          margin: 6px 0;
        }
        .post-op {
          margin: 10px 12px 6px;
        }
        .post-reply {
          background-color: #F0E0D6;
          border: 1px solid #D9BFB7;
          display: table;
          margin: 6px 0 6px 20px;
          padding: 8px 12px;
        }
        .post-reply-op {
          background-color: #E0D6F0;
          border: 1px solid #B7A9D9;
          display: table;
          margin: 6px 0 6px 20px;
          padding: 8px 12px;
        }
        .op-tag {
          display: inline-block;
          background-color: #7B0A0E;
          color: #fff;
          font-size: 10px;
          font-weight: bold;
          padding: 0px 4px;
          margin-left: 6px;
          vertical-align: middle;
          letter-spacing: 0.5px;
        }

        .post-info {
          font-size: 15px;
          margin-bottom: 6px;
        }
        .post-subject {
          color: #CC1105;
          font-weight: bold;
          font-size: 16px;
          text-decoration: none;
          cursor: pointer;
        }
        .post-subject:hover {
          text-decoration: underline;
        }

        /* Sticky */
        .sticky-container {
          background-color: #FFFFDD;
          border-left: 4px solid #AF0A0F;
          padding: 6px 12px;
        }
        .sticky-badge {
          display: inline-block;
          background-color: #AF0A0F;
          color: #fff;
          font-size: 11px;
          font-weight: bold;
          padding: 1px 6px;
          margin-right: 6px;
          vertical-align: middle;
          letter-spacing: 0.5px;
        }
        .post-name {
          color: #117743;
          font-weight: bold;
        }
        .post-date {
          color: #666;
        }
        .post-number {
          color: #800000;
        }
        .post-number:hover {
          color: #E00000;
        }

        .post-content {
          font-size: 16px;
          line-height: 1.5;
          margin: 6px 0;
          word-wrap: break-word;
          max-width: 700px;
        }
        .greentext {
          color: #789922;
        }

        .post-meta {
          font-size: 14px;
          color: #800000;
          margin-top: 4px;
        }
        .post-meta a {
          color: #800000;
          text-decoration: none;
        }
        .post-meta a:hover {
          text-decoration: underline;
          color: #E00000;
        }

        /* Thread stats */
        .thread-stats {
          font-size: 14px;
          color: #707070;
          margin: 2px 0 2px 20px;
          font-style: italic;
        }

        /* Footer */
        .board-footer {
          text-align: center;
          padding: 16px 8px;
          font-size: 14px;
          color: #666;
          border-top: 1px solid #D9BFB7;
          margin-top: 8px;
        }

        /* Reply link */
        .reply-link {
          font-size: 14px;
          color: #800000;
          text-decoration: none;
          margin-left: 8px;
        }
        .reply-link:hover {
          color: #E00000;
          text-decoration: underline;
        }

        /* Back link */
        .back-link {
          color: #800000;
          text-decoration: none;
          font-size: 15px;
        }
        .back-link:hover {
          color: #E00000;
          text-decoration: underline;
        }

        /* Delete btn */
        .delete-btn {
          font-size: 14px;
          color: #800000;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
        }
        .delete-btn:hover {
          color: #E00000;
          text-decoration: underline;
        }

        /* Error modal */
        .error-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .error-modal {
          background: #F0E0D6;
          border: 2px solid #AF0A0F;
          padding: 24px 32px;
          max-width: 420px;
          text-align: center;
          font-family: arial, helvetica, sans-serif;
        }
        .error-modal-title {
          color: #AF0A0F;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        .error-modal-text {
          color: #333;
          font-size: 15px;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .error-modal-btn {
          background-color: #AF0A0F;
          color: #fff;
          border: none;
          padding: 6px 20px;
          font-size: 14px;
          cursor: pointer;
          font-family: inherit;
        }
        .error-modal-btn:hover {
          background-color: #7B0A0E;
        }
      `}</style>
      {children}
    </div>
  );
}
