import React, { useEffect, useState } from 'react';
import FormInput from '../../widgets/FormInput/FormInput';
import bankTransfers from '../../../data/bankTransfers';
import PaymentsList from './PaymentsList';
import { filteredList } from '../../../utils/listUtils';

const Payments = ({ hide, setPaymentData }) => {
  const [searchText, setSearchText] = useState('');
  const [transferList, setTransferList] = useState([]);

  useEffect(() => {
    setTransferList(bankTransfers);
  }, []);

  if (hide) {
    return null;
  }

  const onIBANSearch = (text) => {
    //const text = searchText.toLowerCase();

    setSearchText(text);
    setTransferList(filteredList(bankTransfers, text));
  };

  return (
    <div className="box_payments ui segment" data-testid="paymentsSection">
      <div className="ui fluid category search">
        <FormInput
          type="text"
          label="Search IBAN"
          name="searchIban"
          testId="searchIban"
          value={searchText}
          onChange={onIBANSearch}
        />
        <div className="box_paymentsList ui placeholder segment center aligned">
          <PaymentsList list={transferList} onClick={setPaymentData} />
        </div>
      </div>
    </div>
  );
};

export default Payments;
