const isEdit = (state) => !!state.invoiceData.id;

const updateInvoiceList = (state) =>
  isEdit(state) ? editInvoiceList(state) : addToInvoiceList(state);

const editInvoiceList = ({ invoiceList, invoiceData }) => {
  const list = [...invoiceList];

  const updatedList = list.map((item) =>
    item.id === invoiceData.id ? invoiceData : item,
  );

  return updatedList;
};

const addToInvoiceList = ({ invoiceList, invoiceData }) => {
  const list = [...invoiceList];
  const id = new Date().getTime();

  list.push({ ...invoiceData, id });

  return list;
};

const filteredList = (list, searchText) =>
  list.filter(({ account }) => account.includes(searchText));

export { updateInvoiceList, isEdit, filteredList };
