/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://www.timsanteford.com/posts/migrating-next-js-image-domains-to-remote-patterns/
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
