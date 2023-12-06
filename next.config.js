/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FETCHBOOKS_URL: "http://localhost:8080/api/fetchbooks",
  },
};

module.exports = nextConfig;
