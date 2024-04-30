import withPWAInit from "@ducanh2912/next-pwa";
await import("./src/env.js");

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  register: true,
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withPWA(config);
