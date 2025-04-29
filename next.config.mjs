/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.afip.gob.ar",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
    

