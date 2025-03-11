import { GoogleAuth } from 'google-auth-library';

const getAccessToken = async () => {
  const auth = new GoogleAuth();
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken;
}



async function main() {
  const token = await getAccessToken();
  console.log(token.token);
}

main();
