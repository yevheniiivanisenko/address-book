import React from 'react';

import FilterMenu from '../containers/FilterMenu';
import ControlMenu from './ControlMenu';

interface MenuProps {
  recordIndices: number[];
  onRecordDisposal: () => void;
  onModalOpen: () => void;
}

const Menu = (props: MenuProps) => {
  const { recordIndices, onRecordDisposal, onModalOpen } = props;

  return (
    <div className="row">
      <div className="col">
        <FilterMenu
          filters={[ 'Name', 'Address', 'City', 'Phone' ]}
          style={{ marginBottom: '2px', width: 'fit-content' }}
        />
      </div>
      <div className="col">
        <ControlMenu
          classNames={[ 'float-right' ]}
          editButtonIsDisabled={recordIndices.length !== 1}
          deleteButtonIsDisabled={recordIndices.length === 0}
          deleteButtonTitle={`Delete${recordIndices.length > 1 ? ' all' : ''}`}
          onRecordDisposal={onRecordDisposal}
          onModalOpen={onModalOpen}
        />
      </div>
    </div>
  );
};

export default Menu;
