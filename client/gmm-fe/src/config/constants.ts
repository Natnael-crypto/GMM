export const constants = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  accessTokenMaxAge: 1000 * 60 * 60, // 1 hr
  refreshTokenMaxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
  },
  google: {
    mapApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  },
  directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL!,
};

export const apiUrls = {
  auth: {
    signUp: `${constants.apiBaseUrl}/auth/register`,
    verifyOtp: `${constants.apiBaseUrl}/otp/verify`,
    facebook: `${constants.apiBaseUrl}/auth/facebook`,
    google: `${constants.apiBaseUrl}/auth/google`,
  },
};

export const mapLibraries = ["places" as const];
