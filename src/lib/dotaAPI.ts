import axios from "axios";

export async function getDota2Details(steamID3: string) {
  const url = `https://api.opendota.com/api/players/${steamID3}/`;
  const response = await axios.get(url);
  return response.data;
}
