import React from 'react';

import { Record } from '../models';

interface TableProps {
  columns: string[];
  data: Record[];
  onRecordSelect: (id: number) => void;
}

const Table: React.SFC<TableProps> = props =>  {
  function renderColumns() {
    const { columns } = props;

    return columns.map((item, index) =>
      <th key={index} scope="col">{item}</th>
    );
  }

  function renderRows() {
    const { data } = props;

    return data.map(({ id, name, address, city, phone }, index) =>
      <tr key={id}>
        <th scope="row">{index + 1}</th>
        <td>{name}</td>
        <td>{address}</td>
        <td>{city}</td>
        <td>{phone}</td>
        <td><input id={id.toString()} type="checkbox" /></td>
      </tr>
    );
  }


  function handleRowClick(e: React.MouseEvent<HTMLElement>) {
    const { onRecordSelect } = props;
    const tr = (e.target as HTMLElement).closest('tr');
    const input = tr!.getElementsByTagName('input')[0];

    input.checked = !input.checked;
    onRecordSelect(Number(input.id));
  }

  return (
    <table className="table table-hover">
      <thead>
      <tr>
        {renderColumns()}
        <th />
      </tr>
      </thead>
      <tbody onClick={handleRowClick}>
      {renderRows()}
      </tbody>
    </table>
  );
};

export default Table;
