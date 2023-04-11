import { useState } from 'react';

type CheckBoxProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const CheckBox = ({ label, value, onChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState(value);

  const handleClick = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 border-2 border-gray-400 rounded-sm mr-3 flex items-center justify-center cursor-pointer transition-colors ${
          checked ? 'bg-red-500 border-red-500' : ''
        }`}
        onClick={handleClick}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.293 4.293a1 1 0 011.414 0l.707.707a1 1 0 010 1.414L8.414 15H6a1 1 0 110-2h2.586l8.707-8.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <label className="text-gray-700 font-medium">{label}</label>
    </div>
  );
};
export default CheckBox;
