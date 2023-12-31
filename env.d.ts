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
      MJ_RESET_PASSWORD_TMP_ID: number;
      JWT_SECRET: string;
      BASE_URL: string;
      ADMIN_USER_PASSWORD: string;
    }
  }
}

export {};
