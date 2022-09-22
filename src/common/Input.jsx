import React from 'react';

const Input = ({ name, formik, placeholder, type = "text" }) => {
  return (
    <div>
      <input
        id={name}
        type={type}
        {...formik.getFieldProps(name)}
        name={name}
        placeholder={placeholder}
      />
      {formik.errors[name] && formik.touched[name] && (
        <p className='error'>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Input;
