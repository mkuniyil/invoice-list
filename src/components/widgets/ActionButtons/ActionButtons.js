import React from 'react';
import { useStore } from '../../storeManagement/AppStore';
import {
  OPEN_MODAL,
  UPDATE_INVOICE_LIST,
  UPDATE_INVOICE_DATA,
} from '../../storeManagement/constants/actions';

const ActionButtons = ({ id }) => {
  const { state, dispatch } = useStore();

  const getRowData = () => state.invoiceList.find((item) => item.id === id);

  const getEditButton = () => (
    <button
      className="ui button mini green"
      onClick={() => {
        dispatch({ type: OPEN_MODAL });
        dispatch({ type: UPDATE_INVOICE_DATA, value: getRowData() });
      }}
      data-testid="editButton"
    >
      Edit
    </button>
  );

  const getDeletedList = () =>
    state.invoiceList.filter((item) => item.id !== id);

  const getDeleteButton = () => (
    <button
      className="ui button mini red"
      onClick={() => {
        dispatch({
          type: UPDATE_INVOICE_LIST,
          value: getDeletedList(state, id),
        });
      }}
      data-testid="deleteButton"
    >
      Delete
    </button>
  );

  return (
    <td className="box_actionButtons">
      {getEditButton()}
      {getDeleteButton()}
    </td>
  );
};

export default ActionButtons;
