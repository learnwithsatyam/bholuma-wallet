import React from "react";

type MnemonicDisplayProps = {
  phrase: string;
};

const MnemonicDisplay: React.FC<MnemonicDisplayProps> = ({ phrase }) => {
  const words = phrase.trim().split(/\s+/);

  return (
    <div className="grid grid-cols-3 gap-4 p-2 md:p-4 bg-gray-900 rounded-xl text-white">
      {words.map((word, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-gray-800 rounded-md px-3 py-2"
        >
          <span className="text-gray-400 text-sm w-5">{index + 1}.</span>
          <span className="text-base font-medium">{word}</span>
        </div>
      ))}
    </div>
  );
};

export default MnemonicDisplay;
