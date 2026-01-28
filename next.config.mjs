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
  },
  // Optimizaciones para reducir uso de RAM durante build
  experimental: {
    // Reduce workers durante build (usa menos RAM pero tarda más)
    workerThreads: false,
    cpus: 1
  },
  // Deshabilitar minificación de SWC si causa problemas de memoria
  swcMinify: true,
};

export default nextConfig;


