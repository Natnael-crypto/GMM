module.exports = {
  subject: 'Password Reset Request',
  message: (token, domain) => `
      <h1>Password Reset</h1>
      <p>You have requested to reset your password. Please use the following link to reset your password:</p>
      <a href="${domain}/en/auth/password-reset?token=${token}">Reset Your Password</a>
      <p>This link is valid for 10 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    `,
};
