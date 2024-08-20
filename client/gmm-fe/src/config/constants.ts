export const constants = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  accessTokenMaxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
};

export const apiUrls = {
  auth: {
    signUp: `${constants.apiBaseUrl}/auth/register`,
    verifyOtp: `${constants.apiBaseUrl}/otp/verify`,
    facebook: `${constants.apiBaseUrl}/auth/facebook`,
    google: `${constants.apiBaseUrl}/auth/google`,
  },
};
