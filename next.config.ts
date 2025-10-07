import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_PORT: "4000",
    NEXT_PUBLIC_ORY_SDK_URL: "http://127.0.0.1:4433",
  },
};

export default nextConfig;
