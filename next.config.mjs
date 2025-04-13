const nextConfig = {
  /* config options here */
  env: {
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ["images.pexels.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
