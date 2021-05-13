const Select = ({ label, value, options, onChange }) => {

  return (
    <div>
      <div>
        <label className="label">{label}</label>
        <div>
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map((option) => (
              <option key={option.vendorID} value={option.vendorID}>
                {option.vendor}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Select
