import axios from "axios";
import { TopMusic} from "./types";



const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const fetchData = (url: string): Promise<TopMusic[]> =>
  api.get(url).then((response) => response.data);

export const fetchMusicUrl = (url:string):Promise<string | undefined> => {
  return api.get(`/download?track_id=${url}`).then((response) => response.data);
}
