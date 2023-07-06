import { useState } from "react";

const Faq = ({ id, title, subTitle }) => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-4" key={id}>
      <button
        className="flex items-center justify-between w-full"
        onClick={() => toggleTab(id)}
      >
        <span className="text-lg font-medium text-gray-900 mt-2">{title}</span>
        {activeTab === 2 ? (
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
      {activeTab === id && (
        <div className="mt-4">
          <p className="text-base text-gray-500">{subTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Faq;
