declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BCRYPT_SALT: number;
      MJ_API_KEY: string;
      MJ_SECRET_KEY: string;
      MJ_FROM: string;
      MJ_FROM_NAME: string;
      MJ_VALIDATION_TMP_ID: number;
    }
  }
}

export {};
