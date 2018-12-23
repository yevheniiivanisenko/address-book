export interface BaseForm {
  name: string;
  address: string;
  city: string;
  phone: string;
}

export interface Record extends BaseForm {
  id: number;
}

export interface State {
  isFetching: boolean;
  records: Record[];
}
