import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { BaseForm } from '../models';
import { addRecord } from '../actions';
import Alert from '../components/Alert';

interface FormProps {
  dispatch: any;
}

interface FormState extends BaseForm {
  showMessage: boolean;
}

class Form extends PureComponent<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);

    this.state = {
      showMessage: false,
      name: '',
      address: '',
      city: '',
      phone: ''
    };
  }

  handleFormSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { name, address, city, phone } = this.state;

    axios.post('http://localhost:3000/records/', { name, address, city, phone })
      .then(response => {
        dispatch(addRecord({ ...response.data }));

        this.setState({
          showMessage: true,
          name: '',
          address: '',
          city: '',
          phone: ''
        });

        setTimeout(() => this.setState({ showMessage: false }), 5000);
      })
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ [ e.currentTarget.name ]: e.currentTarget.value } as Pick<BaseForm, keyof BaseForm>);
  };

  render() {
    const { showMessage, name, address, city, phone } = this.state;

    return (
      <form onSubmit={this.handleFormSubmission}>
        <Alert isVisible={showMessage} message="Record has been successfully added" />
        <p>Record creation form</p>
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
            type="text"
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
        <button className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default connect()(Form);
