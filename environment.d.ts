declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

export {};
