import { useState } from 'react';

export default function SwitchButton({isOn,toggleSwitch}) {
 
  return (
    <div className="flex items-center">
      <div 
        onClick={toggleSwitch}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700">
        {isOn ? 'On' : 'Off'}
      </span>
    </div>
  );
}
