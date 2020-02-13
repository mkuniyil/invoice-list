import React, { useEffect, useState } from 'react';
import './InvoiceForm.scss';
import FormInput from '../../widgets/FormInput/FormInput';
import ToggleInput from '../../widgets/ToggleInput/ToggleInput';
import Payments from '../../sections/Payments/Payments';

const InvoiceForm = ({ formData, setFormData, hasError }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    updateFormInput('account')(paymentData.account);
    updateFormInput('amount')(paymentData.amount);
    setShowPayment(false);
  }, [paymentData]);

  const updateFormInput = (key) => (value) =>
    setFormData({ ...formData, [key]: value });

  const togglePaymentInfo = () => setShowPayment(!showPayment);

  return (
    <form className="box_invoiceForm ui form">
      <FormInput
        type="date"
        label="Date"
        name="invoiceDate"
        testId="invoiceDate"
        min="1970-01-01"
        max="2020-12-31"
        value={formData.date}
        onChange={updateFormInput('date')}
      />
      <FormInput
        type="text"
        label="Subject"
        name="invoiceSubject"
        testId="invoiceSubject"
        value={formData.subject}
        onChange={updateFormInput('subject')}
      />
      <ToggleInput
        label="Retrieve amount from Bank account"
        name="accountDetails"
        testId="accountDetails"
        onChange={togglePaymentInfo}
      />
      <FormInput
        type="number"
        label="Amount"
        name="invoiceAmount"
        testId="invoiceAmount"
        value={formData.amount}
        hide={showPayment}
        onChange={updateFormInput('amount')}
      />
      {hasError && (
        <div className="field error" data-testid="errorMessage">
          <label>Please fill out all the fields</label>
        </div>
      )}
      <Payments hide={!showPayment} setPaymentData={setPaymentData} />
    </form>
  );
};

export default InvoiceForm;
