import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { fetchRecords } from '../actions';

interface FilterMenuProps {
  filters: string[];
  style: object;
  fetchRecords: (query: string) => void;
}

interface FilterMenuState {
  term: string;
  disabledMenu: boolean;
}

class FilterMenu extends PureComponent<FilterMenuProps, FilterMenuState> {
  constructor(props: FilterMenuProps) {
    super(props);

    this.state = {
      term: '',
      disabledMenu: true
    };
  }

  handleButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    const { term } = this.state;
    const { fetchRecords } = this.props;
    const entity = e.currentTarget.innerHTML.toLowerCase();
    const query = `?${entity}=${term}`;

    fetchRecords(query);
  };

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value;

    this.setState({ term, disabledMenu: !term });
  };

  renderButtonGroup() {
    const { filters } = this.props;
    const { disabledMenu } = this.state;

    return (
      <div className="btn-group">
        {filters.map((item, index) =>
          <button
            key={index}
            className="btn btn-light"
            disabled={disabledMenu}
            onClick={this.handleButtonClick}
          >
            {item}
          </button>
        )}
      </div>
    );
  }

  render() {
    const { term } = this.state;
    const { style } = this.props;

    return (
      <div
        className="filter-menu"
        style={style}
      >
        <input
          className="form-control"
          style={{ marginBottom: '4px' }}
          placeholder="Filter by"
          value={term}
          onChange={this.handleInputChange}
        />
        {this.renderButtonGroup()}
      </div>
    )
  }
}

// TODO: Reconsider dispatch parameter typing
const mapDispatchToProps = (dispatch: any) => ({
  fetchRecords: (query: string) => dispatch(fetchRecords(query))
});

export default connect(null, mapDispatchToProps)(FilterMenu);
