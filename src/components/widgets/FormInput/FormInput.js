import React from 'react';

const FormInput = ({
  hide,
  label,
  name,
  onChange,
  testId,
  ...props
}) => {
  if (hide) {
    return null;
  }

  const onChangeHandler = (e) => onChange(e.target.value);

  return (
    <div className="inline two fields">
      <div className="field">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="field">
        <input
          name={name}
          data-testid={testId}
          onChange={(e) => onChangeHandler(e)}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormInput;
