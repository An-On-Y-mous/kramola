"use client";
import React, { useState } from "react";

const languageOptions = [
  { key: "English", text: "English", value: "English" },
  { key: "Russian", text: "Russian", value: "Russian" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
];

const DropdownExampleSearchDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleChange}>
      <option value="" disabled>
        Select Language
      </option>
      {languageOptions.map((option) => (
        <option key={option.key} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default DropdownExampleSearchDropdown;
