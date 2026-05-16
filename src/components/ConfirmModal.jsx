import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal">
        <button className="close-modal" onClick={onCancel}>
          <X size={24} />
        </button>
        <div className="confirm-icon-wrapper">
          <AlertTriangle size={48} className="confirm-icon" />
        </div>
        <h2>{title}</h2>
        <p className="modal-subtitle">{message}</p>
        
        <div className="confirm-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
