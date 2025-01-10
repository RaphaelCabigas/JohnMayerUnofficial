/** @type {import('next').NextConfig} */
const nextConfig = {

    // Allow the images to load with this kind of links/domains
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            }
        ]
    }
};

export default nextConfig;
