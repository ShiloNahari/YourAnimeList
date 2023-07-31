import http from "./httpService";

export const addAnimeToList = async(data) =>{
  const options = {
    url: process.env.REACT_APP_SERVER_URL + '/api/animelist'
  }
  http.post(options,data)
}