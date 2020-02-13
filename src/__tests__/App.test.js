import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import { AppStoreProvider } from '../components/storeManagement/AppStore';
import bankTransfers from '../data/bankTransfers';
import { filteredList } from '../utils/listUtils';

const getStore = () => {
  return {
    showModal: false,
    invoiceList: [
      {
        date: '2018-01-01',
        subject: 'Rent - January',
        amount: '500',
        account: 'DE91100000000123456789',
      },
    ],
    invoiceData: {},
  };
};

const getComponent = (store) =>
  render(
    <AppStoreProvider store={store}>
      <Dashboard />
    </AppStoreProvider>,
  );

test('When no invoices are added, it should render table with no data text', () => {
  const { queryByTestId } = getComponent();

  expect(queryByTestId('noData')).not.toBeNull();
});

test(
  'When Add invoices button is clicked, it should open ' +
    'modal with no preset values & Add invoice header text',
  () => {
    const { queryByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();

    expect(queryByTestId('appModal')).not.toBeNull();
    expect(queryByTestId('modalHeader').textContent).toEqual('Add Invoice');
    expect(queryByTestId('accountDetails')).toHaveProperty('checked', false);
    ['invoiceDate', 'invoiceSubject', 'invoiceAmount'].map((testId) => {
      expect(queryByTestId(testId).value).toEqual('');
    });
  },
);

test('When invoices are added, it should render table with list', () => {
  const { queryByTestId } = getComponent(getStore());

  expect(queryByTestId('noData')).toBeNull();
  expect(queryByTestId('invoiceListItem')).not.toBeNull();
});

test('When Edit button is clicked, it should open modal with preset values ', () => {
  const store = getStore();
  const { queryByTestId } = getComponent(store);

  queryByTestId('editButton').click();

  expect(queryByTestId('appModal')).not.toBeNull();
  expect(queryByTestId('accountDetails')).toHaveProperty('checked', false);

  const { date, subject, amount } = store.invoiceList[0];

  expect(queryByTestId('invoiceDate').value).toEqual(date);
  expect(queryByTestId('invoiceSubject').value).toEqual(subject);
  expect(queryByTestId('invoiceAmount').value).toEqual(amount);
});

test('When Delete button is clicked, it should delete the entry from the list', () => {
  const store = getStore();
  const { queryByTestId } = getComponent(store);

  queryByTestId('deleteButton').click();

  expect(queryByTestId('noData')).not.toBeNull();
  expect(queryByTestId('invoiceListItem')).toBeNull();
});

test(
  'When checkbox for retrieve amount from bank account is ' +
    'not selected, then payment section should not be shown',
  () => {
    const { queryByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();
    expect(queryByTestId('paymentsSection')).toBeNull();
  },
);

test(
  'When checkbox for retrieve amount from bank account is ' +
    'selected, then payment section should be shown',
  () => {
    const { queryByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();
    queryByTestId('accountDetails').click();

    expect(queryByTestId('paymentsSection')).not.toBeNull();
  },
);

test(
  'When search text is not entered in IBAN search field ' +
    'the list should show the default result',
  () => {
    const listLength = filteredList(bankTransfers, '').length;
    const { queryByTestId, queryAllByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();
    queryByTestId('accountDetails').click();

    expect(queryAllByTestId('paymentsListItem').length).toEqual(listLength);
  },
);

test(
  'When search text is entered in IBAN search field ' +
    'the list should show the filtered result',
  () => {
    const searchText = 'DE';
    const { queryByTestId, queryAllByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();
    queryByTestId('accountDetails').click();

    fireEvent.change(queryByTestId('searchIban'), {
      target: { value: searchText },
    });

    const listLength = filteredList(bankTransfers, searchText).length;

    expect(queryAllByTestId('paymentsListItem').length).toEqual(listLength);
  },
);

test(
  'When payment list row is selected, then the amount should ' +
    'be populated with the one which is selected',
  async () => {
    const index = 2;
    const { queryByTestId, queryAllByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();
    queryByTestId('accountDetails').click();
    queryAllByTestId('paymentsListItem')[index].click();

    const amount = bankTransfers[index].amount;
    const invoiceAmountNode = await waitForElement(() =>
      queryByTestId('invoiceAmount'),
    );

    expect(invoiceAmountNode.value).toEqual(amount);
  },
);

test(
  'When date, subject or amount field is empty ' + 'display the error message',
  () => {
    const { queryByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();

    fireEvent.change(queryByTestId('invoiceDate'), {
      target: { value: '' },
    });

    expect(queryByTestId('errorMessage').textContent).toEqual(
      'Please fill out all the fields',
    );
  },
);

test(
  'When date, subject and amount field is filled, ' +
    'then error message should not be shown',
  () => {
    const { queryByTestId } = getComponent();

    queryByTestId('addInvoiceButton').click();

    const { date, subject, amount } = getStore().invoiceList[0];

    fireEvent.change(queryByTestId('invoiceDate'), {
      target: { value: date },
    });
    fireEvent.change(queryByTestId('invoiceSubject'), {
      target: { value: subject },
    });
    fireEvent.change(queryByTestId('invoiceAmount'), {
      target: { value: amount },
    });

    expect(queryByTestId('errorMessage')).toBeNull();
  },
);
