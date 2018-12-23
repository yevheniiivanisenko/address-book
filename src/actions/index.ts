import axios from 'axios';
import { Dispatch } from 'react';

import { Record } from '../models';

import {
  ADD_RECORD,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD
} from '../constants/ActionTypes';

export function addRecord(record: Record) {
  return {
    type: ADD_RECORD,
    record
  }
}

export function requestRecords() {
  return {
    type: REQUEST_RECORDS
  }
}

export function receiveRecords(records: Record[]) {
  return {
    type: RECEIVE_RECORDS,
    records
  }
}

// TODO: Reconsider dispatch parameter typing
export function fetchRecords(query = '') {
  return function(dispatch: Dispatch<object>) {
    dispatch(requestRecords());
    return axios.get(`http://localhost:3000/records/${query}`)
      .then(response => dispatch(receiveRecords(response.data)))
  }
}

export function updateRecord(record: Record) {
  return {
    type: UPDATE_RECORD,
    record
  }
}

export function deleteRecord(id: number) {
  return {
    type: DELETE_RECORD,
    id
  }
}

