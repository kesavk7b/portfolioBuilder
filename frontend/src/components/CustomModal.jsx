import { ReactNode } from "react";


const CustomModal = ({ isOpen, onClose, title, children, footer="" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-[var(--color-bg)] border border-[var(--color-border)] rounded-2xl shadow-lg w-96 p-6 z-10">
        {/* Header */}
        {title && <h2 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)] text-center">{title}</h2>}

        {/* Body */}
        <div>{children}</div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          {footer}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;