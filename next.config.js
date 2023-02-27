/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `
        @import "@/styles/fonts.scss";
        @import "@/styles/config-bootstrap.scss";
      `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:slug*",
        destination: "http://localhost:8000/api/v1/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
