const MainInput = (props) => {
  return (
    <>
      <input
        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-yellow-500 focus:outline-none"
        type={props.type}
        name={props.name}
        maxLength={props.maxLength}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyPress}
        placeholder={props.placeholder}
        disabled={props.disabled}
        min={props.min}
      />
    </>
  );
};
export default MainInput;
