/*
  Modal Component
  - A fully reusable, accessible overlay modal rendered via ReactDOM.createPortal.
  - Features:
    * Portal: Renders directly into document.body to avoid stacking context issues.
    * ESC Key: A keydown listener on the document closes the modal on Escape press.
    * Backdrop Click: Clicking the semi-transparent overlay behind the modal closes it.
    * Scroll Lock: Adds overflow-hidden to document.body while the modal is open
      to prevent the page from scrolling underneath.
    * Focus Trap: Auto-focuses the first focusable input inside the modal on open.
    * Smooth Animation: Fade-in + scale-up using Tailwind transition classes.
    * Size Variants: "sm", "md", "lg" control the max-width of the modal panel.
*/

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// --- Size Variant Utility ---
// Maps the size prop to a Tailwind max-width class.
const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  // Ref to the modal panel, used for focus trap
  const modalRef = useRef(null);

  // --- Effect 1: ESC Key Listener ---
  // Attaches a 'keydown' listener to the document when the modal is open.
  // When the Escape key is pressed, 'onClose' is called to hide the modal.
  // The cleanup function removes the listener when the modal closes or unmounts.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // --- Effect 2: Body Scroll Lock ---
  // When the modal is open, adds 'overflow-hidden' to <body> to prevent
  // background page scroll. Cleaned up when modal closes.
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  // --- Effect 3: Auto-Focus First Input ---
  // After the modal opens, finds the first focusable element (input/textarea/select)
  // inside the modal panel and focuses it automatically for accessibility.
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const firstFocusable = modalRef.current.querySelector(
        "input, textarea, select, button"
      );
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
    }
  }, [isOpen]);

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  // --- Backdrop Click Handler ---
  // Fires 'onClose' only when the user clicks directly on the backdrop overlay,
  // not on the modal panel itself. This is achieved using event.target check.
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // --- Portal: Render into document.body ---
  // Using createPortal breaks the modal out of the React component tree's DOM position.
  // This avoids CSS inheritance and z-index stacking context issues from parent elements.
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal Panel — scale-up + fade-in animation */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 animate-[scaleIn_0.25s_ease-out] overflow-hidden`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2
            id="modal-title"
            className="text-lg font-bold text-slate-800 dark:text-white tracking-tight"
          >
            {title}
          </h2>

          {/* Close (X) Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Body — scrollable if content overflows */}
        <div className="px-6 py-5 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>,
    // Portal target: render outside the component tree, into <body>
    document.body
  );
};

export default Modal;
