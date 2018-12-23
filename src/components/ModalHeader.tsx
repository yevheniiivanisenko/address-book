import React from 'react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className="modal-header">
      <h5 className="modal-title">
        {title}
      </h5>
      <button
        className="close"
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">
          &times;
        </span>
      </button>
    </div>
  );
};

export default ModalHeader;
