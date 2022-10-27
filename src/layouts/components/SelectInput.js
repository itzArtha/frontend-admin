import React from "react";
const SelectInput = (props) => {
  return (
    <React.Fragment>
      <select
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-yellow-500 focus:outline-none"
        onChange={props.onChange}
        value={props.value}
      >
        {props.children}
      </select>
    </React.Fragment>
  );
};
export default SelectInput;
