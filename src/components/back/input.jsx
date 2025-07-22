import React from 'react';

const Input = ({ type, placeholder, name, value, handleChange,className }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};

export default Input;
