import React from 'react';
import AppList from '../../widgets/List/AppList';

const PaymentsList = ({ list, onClick }) => {
  const headers = [
    { key: 'date', displayText: 'Date' },
    { key: 'subject', displayText: 'Subject' },
    { key: 'amount', displayText: 'Amount' },
    { key: 'account', displayText: 'Account Details' },
  ];

  return (
    <AppList
      list={list}
      headers={headers}
      inlineAction={true}
      onClick={onClick}
      testId="paymentsListItem"
    />
  );
};

export default PaymentsList;
