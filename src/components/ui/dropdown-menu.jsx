import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const languageOptions = [
  { key: "English", text: "English", value: "en" },
  { key: "Russian", text: "Russian", value: "ru" },
  { key: "Spanish", text: "Spanish", value: "es" },
];

const Dropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language");
  const dropdownRef = useRef(null);

  // Update selected language based on current route
  useEffect(() => {
    if (pathname === "/") {
      setSelectedLanguage("Select Language");
    } else {
      const currentLang = pathname.slice(1); // Remove the leading slash
      const language = languageOptions.find((opt) => opt.value === currentLang);
      if (language) {
        setSelectedLanguage(language.text);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (value, text) => {
    if (value === "en") {
      router.push("/");
    } else {
      router.push(`/${value}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white bg-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        {selectedLanguage}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 z-10 bg-[#222222] divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-white">
            {languageOptions.map((option) => (
              <li key={option.key}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLanguageSelect(option.value, option.text);
                  }}
                  className="block px-4 py-2 hover:bg-gray-600 text-center"
                >
                  {option.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
