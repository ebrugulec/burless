const dev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'stage';

export const server = dev ? 'http://localhost:8080' : 'https://burless.com';
