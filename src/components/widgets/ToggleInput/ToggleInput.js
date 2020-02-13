import React from 'react';

const ToggleInput = ({ label, name, onChange, testId }) => {
  return (
    <div className="inline field">
      <div className="ui checkbox">
        <input
          type="checkbox"
          name={name}
          tabIndex="0"
          onChange={onChange}
          data-testid={testId}
        />
        <label htmlFor="useBankAccount">{label}</label>
      </div>
    </div>
  );
};

export default ToggleInput;
