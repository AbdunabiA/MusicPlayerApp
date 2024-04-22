import axios from "axios";
import { TopMusic } from "./types";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const fetchData = async (url: string): Promise<TopMusic[]> => {
  let token = ''
  const sessionData = sessionStorage.getItem("tokens");
  if (sessionData) {
    let tokens = JSON.parse(sessionData);
    if(!tokens?.length || !tokens){
      tokens = await fetchTokens();
    }
    token = tokens[0];
    sessionStorage.setItem("tokens", JSON.stringify(tokens.slice(1)));
  }

  return api.get(`${url}&token=${token}`).then((response) => response.data);
};

export const fetchMusicUrl = async (
  url: string
): Promise<string | undefined> => {
  let token = "";
  const sessionData = sessionStorage.getItem("tokens");
  if (sessionData) {
    let tokens = JSON.parse(sessionData);
    if (!tokens?.length || !tokens) {
      tokens = await fetchTokens();
    }
    // console.log("fetch data tokens", tokens);

    token = tokens[0];
    // console.log("fetch data token", token);
    // console.log("fetch data tokens spliced", tokens.slice(1));
    sessionStorage.setItem("tokens", JSON.stringify(tokens.slice(1)));
  }
  return api
    .get(`/download?track_id=${url}&token=${token}`)
    .then((response) => response.data).catch(()=> 'error');
};

export const fetchTokens = async (): Promise<string[]> => {
  return axios
    .post(
      'https://dosimple.io/bot/api/security/request?token=f818b8fa-b41a-4a18-897b-fd36bd1875f8'
    )
    .then((response) => {
      // console.log("fetched Tokens", response.data);

      return response.data;
    });
};
