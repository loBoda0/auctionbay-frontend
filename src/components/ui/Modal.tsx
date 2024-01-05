import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalContainer = document.createElement('div');

  useEffect(() => {
    if (!modalRoot) return;

    modalRoot.appendChild(modalContainer);

    return () => {
      modalRoot.removeChild(modalContainer);
    };
  }, [modalContainer, modalRoot]);

  if (!isOpen) return null;

  const disableClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={disableClose}>
        {children}
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;