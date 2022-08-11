/* eslint-disable no-console */

const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`mock invoked: getGithubProfile(${token})`);
  return {
    login: 'fraud',
    avatar_url: 'http://placekitten.com/200/300',
    email: 'fraud@scam.com'
  };  
};

module.exports = { exchangeCodeForToken, getGithubProfile };
