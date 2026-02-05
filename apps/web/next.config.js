/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/components",
        destination: "/docs/registry",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
