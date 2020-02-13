import React, { useEffect, useState } from 'react';
import { Header, Modal } from 'semantic-ui-react';
import InvoiceForm from '../../pages/InvoiceForm/InvoiceForm';
import { useStore } from '../../storeManagement/AppStore';
import { updateInvoiceList, isEdit } from '../../../utils/listUtils';

const AppModal = ({ getButtonContent, showModal, closeModal }) => {
  const { state, dispatch } = useStore();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(isInvalidForm());
  }, [state.invoiceData]);

  const isInvalidForm = () => {
    const { date, amount, subject } = state.invoiceData;

    return !date || !amount || !subject;
  };
  const onSaveHandler = () => {
    if (isInvalidForm()) {
      setHasError(true);
      return;
    }

    const value = updateInvoiceList(state);

    dispatch({
      type: 'UPDATE_INVOICE_LIST',
      value,
    });
    dispatch({ type: 'CLOSE_MODAL' });
    dispatch({ type: 'UPDATE_INVOICE_DATA', value: {} });
  };

  const setFormData = (value) => {
    dispatch({ type: 'UPDATE_INVOICE_DATA', value });
  };

  const getHeader = () => `${isEdit(state) ? 'Edit' : 'Add'} Invoice`;

  return (
    <Modal
      closeIcon
      open={showModal}
      trigger={getButtonContent()}
      size="small"
      onClose={closeModal}
      data-testid="appModal"
    >
      <Header icon="archive" content={getHeader()} data-testid="modalHeader" />
      <Modal.Content>
        <InvoiceForm
          formData={state.invoiceData}
          setFormData={setFormData}
          hasError={hasError}
        />
      </Modal.Content>
      <Modal.Actions>
        <button
          type="button"
          className="ui button mini blue"
          onClick={() => onSaveHandler()}
        >
          Done
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default AppModal;
