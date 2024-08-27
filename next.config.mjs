import { config } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          
        },
      ],
  }
};

export default nextConfig;

