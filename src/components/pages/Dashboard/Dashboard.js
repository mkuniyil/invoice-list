import React from 'react';
import './Dashboard.scss';
import InvoiceList from '../../sections/InvoiceList/InvoiceList';
import AppModal from '../../widgets/AppModal/AppModal';
import useIsMobile from '../../../utils/utils';
import { useStore } from '../../storeManagement/AppStore';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  UPDATE_INVOICE_DATA,
} from '../../storeManagement/constants/actions';

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { state, dispatch } = useStore();

  const openModal = () => dispatch({ type: OPEN_MODAL });
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: UPDATE_INVOICE_DATA, value: {} });
  };

  const getModalButton = () => (
    <button
      data-testid="addInvoiceButton"
      className="ui button mini blue"
      onClick={openModal}
    >
      {isMobile ? (
        <i className="plus square outline icon large"></i>
      ) : (
        'Add New Invoice'
      )}
    </button>
  );

  return (
    <div className="box_dashboard">
      <div className="box_content">
        <div className="box_header">
          <h2 className="ui header">Invoice List</h2>
          <AppModal
            getButtonContent={getModalButton}
            showModal={state.showModal}
            closeModal={closeModal}
          />
        </div>
        <div className="ui segment center aligned">
          <InvoiceList list={state.invoiceList} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
