import React from "react";
import { useRouter } from "next/navigation";

const languageOptions = [
  { key: "English", text: "English", value: "en" },
  { key: "Russian", text: "Russian", value: "ru" },
  { key: "Spanish", text: "Spanish", value: "es" },
];

const Dropdown = () => {
  const router = useRouter();

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    if (selectedLang == "en") return router.push(`/`);
    if (selectedLang) {
      router.push(`/${selectedLang}`);
    }
  };

  return (
    <div className="font-poppins text-[15px] text-center font-medium text-white bg-[#222222]">
      <select
        className="bg-black text-center outline-none border-none"
        defaultValue=""
        onChange={handleChange}
      >
        <option className="hover:bg-red-800" value="" disabled>
          Select Language
        </option>
        {languageOptions.map((option) => (
          <option className="bg-red-800" key={option.key} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
