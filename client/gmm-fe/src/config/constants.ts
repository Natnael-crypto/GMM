export const constants = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  accessTokenMaxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
  },
};

export const apiUrls = {
  auth: {
    signUp: `${constants.apiBaseUrl}/auth/register`,
    verifyOtp: `${constants.apiBaseUrl}/otp/verify`,
    facebook: `${constants.apiBaseUrl}/auth/facebook`,
    google: `${constants.apiBaseUrl}/auth/google`,
  },
};
