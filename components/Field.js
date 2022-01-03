function Field({ label, children }) {
  return (
    <label className="block my-6 ml-10 mr-10">
      <span className="block">
        {label}
      </span>
      {children}
    </label>
  );
}

export default Field;
