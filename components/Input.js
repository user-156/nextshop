function Input({ type, required, value, onChange }) {
  return (
    <input type={type} required={required}
      value={value} onChange={onChange}
      className="border rounded px-3 py-1 mt-3 text-base w-full h-10 text-black"
    />
  );
}

export default Input;
