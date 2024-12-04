"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const languageOptions = [
  { key: "English", text: "English", value: "en" },
  { key: "Russian", text: "Russian", value: "ru" },
  { key: "Spanish", text: "Spanish", value: "es" },
];

const Dropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    if (selectedLang) {
      router.push(`/${selectedLang}`);
    }
  };

  return (
    <div className="font-poppins text-[19px] text-center font-medium">
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
    </div>
  );
};

export default Dropdown;
