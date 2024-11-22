import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "image-cdn.example.com",
      "globalnews.ca",
      "i2.wp.com",
      "img-s-msn-com.akamaized.net",
      "",
    ],
  },
};

export default nextConfig;
