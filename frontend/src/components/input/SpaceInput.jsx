import { useState, useEffect } from "react";

const SpaceInput = ({value = "0px",placeholder="", onChange }) => {
  const units = ["px", "vh", "vw", "rem", "em"];
  const [number, setNumber] = useState(0);
  const [unit, setUnit] = useState("px");

  // Parse the initial value whenever `value` changes
  useEffect(() => {
    const match = value.match(/^(-?\d+\.?\d*)([a-z%]+)$/i);
    if (match) {
      setNumber(match[1]);
      setUnit(match[2]);
    }
  }, [value]);

  // Handler when number changes
  const handleNumberChange = (e) => {
    const val = e.target.value;
    setNumber(val);
    onChange?.(`${val}${unit}`); // Call parent onChange
  };

  // Handler when unit changes
  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    onChange?.(`${number}${newUnit}`); // Call parent onChange
  };

  return (
    <div className="p-1 flex">
        <input
            type="number"
            className="
            p-2
            md:w-full 
            lg:w-full 
            bg-[var(--color-bg)] 
            text-[var(--color-text-secondary)] 
            py-2 rounded-l-lg h-10
            [appearance:textfield] 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none
            "
            value={number}
            onChange={handleNumberChange}
            placeholder={placeholder}
        />
        <select
            className="bg-[var(--color-bg)] text-[var(--color-text-secondary)] py-2 rounded-r-lg h-10"
            value={unit}
            onChange={handleUnitChange}
        >
            {units.map((u, i) => (
            <option key={i} value={u}>
                {u}
            </option>
            ))}
        </select>
    </div>
  );
};

export default SpaceInput;
