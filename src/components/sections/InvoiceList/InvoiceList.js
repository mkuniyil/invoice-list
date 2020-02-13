import React from 'react';
import AppList from '../../widgets/List/AppList';

const InvoiceList = ({ list }) => {
  const headers = [
    { key: 'date', displayText: 'Date' },
    { key: 'subject', displayText: 'Subject' },
    { key: 'amount', displayText: 'Amount' },
    { key: 'account', displayText: 'Account Details' },
    { key: 'action', displayText: 'Actions' },
  ];

  return <AppList list={list} headers={headers} testId="invoiceListItem" />;
};

export default InvoiceList;
