/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.yet-another-react-lightbox.com',
            },
        ],
    },
};

export default nextConfig;
