import React from "react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="z-20 dark:bg-gray-600 rounded-md p-6 w-96 flex flex-col items-center justify-center">
        {children}
        <button
          className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-md w-full"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
