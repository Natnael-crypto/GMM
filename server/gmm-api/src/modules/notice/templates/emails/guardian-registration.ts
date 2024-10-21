module.exports = {
  subject: 'Guardian Request',
  message: (userName, relationship, domain, token) => `
      <h1>Guardian Registration Request</h1>
      <p>${userName} has invited as their ${relationship} on Guardian Muslim Marriage platform.</p>
      <p>Click the link below to join Guardian Muslim Marriage platform:</p>
      <a href="${domain}/en/auth/guardian-registration?token=${token}">Join Guardian Muslim Marriage</a>      
    `,
};
