import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000b5] flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">✕</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
