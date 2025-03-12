import { GoogleAuth } from 'google-auth-library';
import { inpaintingSample } from './sampleEditImg';
import axios from 'axios';
import fs from 'fs';

const location = "us-central1";
const project = 'lon-next';

const generateUrl = (location: string, projectId: string): string => {
  return `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/imagen-3.0-capability-001:predict`
}

const getAccessToken = async () => {
  const auth = new GoogleAuth();
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken;
}



async function main() {
  const token = await getAccessToken();
  // console.log(token.token);
  const result = await axios.post(generateUrl(location, project), inpaintingSample, {
    headers: {
      "Authorization": `Bearer ${token.token}`,
      "Content-Type": "application/json; charset=utf-8"
    }
  });
  console.log(result.statusText);
  const predictions = result.data.predictions;
  let i = 0;
  for(const prediction of predictions) {
    i++;
    fs.writeFileSync(`pOf${i}.png`, new Buffer(prediction.bytesBase64Encoded, 'base64'));
  }
}

main();
