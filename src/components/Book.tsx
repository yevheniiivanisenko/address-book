import React from 'react';

import { Record } from '../models';
import Menu from './Menu';
import Table from './Table';
import Modal from './Modal';
import ModalHeader from './ModalHeader';
import ModalEditingForm from './ModalEditingForm';

interface BookProps {
  records: Record[];
  fetchRecords: () => void;
  deleteRecord: (id: number) => void;
  updateRecord: (record: Record) => void;
}

interface BookState {
  showModal: boolean;
  recordIndices: number[];
}

class Book extends React.Component<BookProps, BookState> {
  constructor(props: BookProps) {
    super(props);

    this.state = {
      showModal: false,
      recordIndices: []
    };
  }

  componentDidMount() {
    this.props.fetchRecords();
  }

  getSelectedRecord() {
    const { records } = this.props;
    const { recordIndices } = this.state;

    return records.filter(record => record.id === recordIndices[0])[0];
  };

  handleRecordDisposal = () => {
    const { deleteRecord } = this.props;
    const { recordIndices } = this.state;
    const promises = Promise.all(recordIndices.map(item => deleteRecord(item)));

    promises.then(() => this.setState({ recordIndices: [] }));
  };

  handleRecordSelect = (id: number) => {
    const { recordIndices } = this.state;
    const found = recordIndices.find(item => item === id);

    if (found) {
      recordIndices.splice(recordIndices.indexOf(found), 1);
    } else {
      recordIndices.push(id);
    }

    this.setState({ recordIndices });
  };

  handleModalOpen = () => {
    this.setState({ showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { records, updateRecord } = this.props;
    const { showModal, recordIndices } = this.state;
    const selectedRecord = this.getSelectedRecord();

    if (records.length === 0) {
      return (
        <div className="book">
          <h2>Book page</h2>
          You do not have any records
        </div>
      )
    }

    return (
      <div className="book">
        <h2>Book page</h2>
        <Menu
          recordIndices={recordIndices}
          onRecordDisposal={this.handleRecordDisposal}
          onModalOpen={this.handleModalOpen}
        />
        <Table
          columns={[ '#', 'Name', 'Address', 'City', 'Phone' ]}
          data={records}
          onRecordSelect={this.handleRecordSelect}
        />
        <Modal isOpen={showModal} onClose={this.handleModalClose}>
          <ModalHeader title="Record edit" onClose={this.handleModalClose} />
          <ModalEditingForm
            record={selectedRecord}
            onRecordUpdate={updateRecord}
            onClose={this.handleModalClose}
          />
        </Modal>
      </div>
    );
  }
}

export default Book;
