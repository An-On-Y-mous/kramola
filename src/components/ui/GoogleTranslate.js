"use client";
import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.googleTranslateElementInit) {
      // Define the initialization function
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      };

      // Load the Google Translate script
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script on component unmount
      return () => {
        const existingScript = document.querySelector(
          "script[src*='translate.google.com']"
        );
        if (existingScript) document.body.removeChild(existingScript);
      };
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
