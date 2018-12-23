import { connect } from 'react-redux';
import axios from 'axios';

import { State, Record } from '../models';
import { fetchRecords, deleteRecord, updateRecord } from '../actions';
import Book from '../components/Book';

const mapStateToProps = (state: State) => ({
  isFetching: state.isFetching,
  records: state.records
});

// TODO: Reconsider dispatch parameter typing
const mapDispatchToProps = (dispatch: any) => ({
  fetchRecords: () => dispatch(fetchRecords()),
  deleteRecord: (id: number) =>
    axios.delete(`http://localhost:3000/records/${id}`)
      .then(() => dispatch(deleteRecord(id))),
  updateRecord: (record: Record) =>
    axios.put(`http://localhost:3000/records/${record.id}`, record)
      .then(() => dispatch(updateRecord(record)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
