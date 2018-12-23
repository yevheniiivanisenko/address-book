import React, { Fragment, PureComponent } from 'react';

import { Record } from '../models';

interface ModalEditingFormProps {
  record: Record;
  onRecordUpdate: (record: Record) => void;
  onClose: () => void;
}

export interface ModalEditingFormState {
  name: string;
  address: string;
  city: string;
  phone: string;
}

class ModalEditingForm extends PureComponent<ModalEditingFormProps, ModalEditingFormState> {
  constructor(props: ModalEditingFormProps) {
    super(props);

    this.state = {
      name: props.record.name,
      address: props.record.address,
      city: props.record.city,
      phone: props.record.phone
    };
  }

  handleFormSubmission = () => {
    const { record, onRecordUpdate, onClose } = this.props;
    const updatedRecord = { ...this.state, id: record.id };

    onRecordUpdate(updatedRecord);
    onClose();
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [ e.currentTarget.name ]: e.currentTarget.value } as Pick<ModalEditingFormState, keyof ModalEditingFormState>);
  };

  render() {
    const { onClose } = this.props;
    const { name, address, city, phone } = this.state;

    return (
      <Fragment>
        <form className="modal-body" onSubmit={this.handleFormSubmission}>
          <div className="form-group">
            <input
              required
              name="name"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              name="address"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              name="city"
              className="form-control"
              placeholder="City"
              value={city}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              required
              name="phone"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button
            onClick={this.handleFormSubmission}
            type="button"
            className="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </Fragment>
    );
  }
}

export default ModalEditingForm;
