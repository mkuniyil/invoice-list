import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_INVOICE_LIST,
  UPDATE_INVOICE_DATA,
} from '../constants/actions';

export const appReducer = (state, { type, value, id }) => {
  switch (type) {
    case OPEN_MODAL:
      return { ...state, showModal: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false };
    case UPDATE_INVOICE_LIST:
      return { ...state, invoiceList: value };
    case UPDATE_INVOICE_DATA:
      return { ...state, invoiceData: { ...value } };
    default:
      return state;
  }
};
