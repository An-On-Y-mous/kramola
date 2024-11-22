import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
        josefin: ["var(--font-josefin)", "sans-serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        squada: ["var(--font-squada)", "sans-serif"],
        workSans: ["var(--font-work_sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
