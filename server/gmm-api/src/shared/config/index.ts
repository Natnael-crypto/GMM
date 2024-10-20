import { z } from 'zod';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
  secret: string;
  accessTokenExpiration: string;
  refreshTokenExpiration: string;
}

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  redirectUris: string[];
}

export interface FacebookOAuthConfig {
  appId: string;
  appSecret: string;
  callbackUrl: string;
}

export interface OAuthConfig {
  google: GoogleOAuthConfig;
  facebook: FacebookOAuthConfig;
}

export interface OtpConfig {
  encryptionKey: string;
}

export interface AuthConfig {
  jwt: JwtConfig;
  oauth: OAuthConfig;
  otp: OtpConfig;
}

export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
}

export interface ClientConfig {
  url: string;
  authSuccessUrl: string;
}

export interface AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;

  s3: {
    bucketName: string;
    presignedUrlTTL: number;
  };
}

export interface EmailConfig {
  host: string;
  username: string;
  password: string;
}

export interface AppConfiguration {
  port: number;
  database: DatabaseConfig;
  email: EmailConfig;
  auth: AuthConfig;
  client: ClientConfig;
  aws: AwsConfig;
  stripe: StripeConfig;
}

const envSchema = z
  .object({
    //   Server
    DOMAIN: z.string(),
    PORT: z.string().transform((val) => parseInt(val, 10)),

    //   Database
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string().transform((val) => parseInt(val, 10)),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),

    // Encryption Keys
    OTP_ENCRYPTION_KEY: z.string(),

    //   JWT
    JWT_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRATION: z.string(),
    REFRESH_TOKEN_EXPIRATION: z.string(),

    //   OAuth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string(),
    GOOGLE_REDIRECT_URIS: z
      .string()
      .transform((value) => value.split(','))
      .refine((arr) => arr.length > 0, "Array can't be empty"),

    FACEBOOK_APP_ID: z.string(),
    FACEBOOK_APP_SECRET: z.string(),
    FACEBOOK_CALLBACK_URL: z.string(),

    //  Frontend
    CLIENT_URL: z.string(),
    CLIENT_AUTH_SUCCESS_URL: z.string(),
    CLIENT_AUTH_FAILURE_URL: z.string(),

    //   AWS
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_S3_PRESIGNED_URL_TTL: z.string().transform((val) => parseInt(val, 10)),

    // Stripe
    STRIPE_API_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),

    //  Email
    EMAIL_HOST: z.string(),
    EMAIL_USER: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_SMTP_CONNECTION: z.string(),
  })
  .required();
export default (): AppConfiguration => {
  const env = process.env;

  const parsedEnv = envSchema.parse(env);

  return {
    port: parsedEnv.PORT,
    database: {
      host: parsedEnv.DATABASE_HOST,
      port: parsedEnv.DATABASE_PORT,
      username: parsedEnv.DATABASE_USERNAME,
      password: parsedEnv.DATABASE_PASSWORD,
      database: parsedEnv.DATABASE_NAME,
    },

    auth: {
      jwt: {
        secret: parsedEnv.JWT_SECRET,
        accessTokenExpiration: parsedEnv.ACCESS_TOKEN_EXPIRATION,
        refreshTokenExpiration: parsedEnv.REFRESH_TOKEN_EXPIRATION,
      },

      oauth: {
        google: {
          clientId: parsedEnv.GOOGLE_CLIENT_ID,
          clientSecret: parsedEnv.GOOGLE_CLIENT_SECRET,
          callbackUrl: parsedEnv.GOOGLE_CALLBACK_URL,
          redirectUris: parsedEnv.GOOGLE_REDIRECT_URIS,
        },

        facebook: {
          appId: parsedEnv.FACEBOOK_APP_ID,
          appSecret: parsedEnv.FACEBOOK_APP_SECRET,
          callbackUrl: parsedEnv.FACEBOOK_CALLBACK_URL,
        },
      },

      otp: {
        encryptionKey: parsedEnv.OTP_ENCRYPTION_KEY,
      },
    },

    client: {
      url: parsedEnv.CLIENT_URL,
      authSuccessUrl: parsedEnv.CLIENT_AUTH_SUCCESS_URL,
    },

    aws: {
      accessKeyId: parsedEnv.AWS_ACCESS_KEY_ID,
      secretAccessKey: parsedEnv.AWS_SECRET_ACCESS_KEY,
      region: parsedEnv.AWS_REGION,

      s3: {
        bucketName: parsedEnv.AWS_S3_BUCKET_NAME,
        presignedUrlTTL: parsedEnv.AWS_S3_PRESIGNED_URL_TTL,
      },
    },

    stripe: {
      apiKey: parsedEnv.STRIPE_API_SECRET_KEY,
      webhookSecret: parsedEnv.STRIPE_WEBHOOK_SECRET,
    },

    email: {
      host: parsedEnv.EMAIL_HOST,
      username: parsedEnv.EMAIL_USER,
      password: parsedEnv.EMAIL_PASSWORD,
    },
  };
};
