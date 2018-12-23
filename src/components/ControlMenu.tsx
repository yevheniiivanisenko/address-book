import React from 'react';

interface ControlMenuProps {
  classNames: string[];
  editButtonIsDisabled: boolean;
  deleteButtonIsDisabled: boolean;
  deleteButtonTitle: string;
  onRecordDisposal: () => void;
  onModalOpen: () => void;
}

const ControlMenu = (props: ControlMenuProps) => {
  const {
    classNames,
    editButtonIsDisabled,
    deleteButtonIsDisabled,
    deleteButtonTitle,
    onRecordDisposal,
    onModalOpen
  } = props;

  return (
    <div className={`btn-group ${classNames}`}>
      <button
        type="button"
        className="btn btn-light"
        disabled={editButtonIsDisabled}
        onClick={onModalOpen}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={deleteButtonIsDisabled}
        onClick={onRecordDisposal}
      >
        {deleteButtonTitle}
      </button>
    </div>
  );
};

export default ControlMenu;
