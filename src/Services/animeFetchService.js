import http from "./httpService";

/* param options:
  search:STRING ex.Fullmetal
  optional Search by title or alternative titles. Search will ignore sort

  genres:STRING ex.Fantasy,Drama
  OPTIONAL genres separated by comma

  sortBy:STRING ex.ranking
  OPTIONAL ranking or title

  sortOrder:STRING ex.asc
  OPTIONAL asc or desc

  types:STRING ex.OVA,ONA,TV
  OPTIONAL Anime type, separated by comma
*/

export const getAllAnimes = async () => {
  const options = {
    method: 'GET',
    url: 'https://anime-db.p.rapidapi.com/anime',
    params: {
      page: '1',
      size: '100',
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host
    }
  }
  try {
    const allAnimes = await http.get(process.env.REACT_APP_API_URL, options)
    console.log(allAnimes.headers["x-ratelimit-requests-remaining"])
    return allAnimes.data.data
  } catch (err) {
    console.error(err);
    return 'error'
  }
}

export const getAnimeById = async(id)=>{
  const options =  {
    method: 'GET',
    url: `https://anime-db.p.rapidapi.com/anime/by-id/${id}`,
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host
    }
  };
  try {
    const anime = await http.get(options.url, options )
    return(anime.data);
  } catch (error) {
    console.log(error);
    return 'error'
  }
}

export const  fetchAnimeList = async (userId) => {
  const options = {
    method: "GET",
    URL: `${process.env.REACT_APP_SERVER_URL}/api/anime-list?userid=${userId}`
  }
  try {
    const yourList = await http.get(options.URL, options)
    return yourList.data.data
  } catch (error) {
    console.log(error);
  }
}

export const addAnimeToList = async(body) =>{
  const options = {
    method:"POST",
    url:`${process.env.REACT_APP_SERVER_URL}/api/anime-list`,
  }
  try {
    const addedAnime = await http.post(options.url, body, options)
    return addedAnime.statusText
  } catch (error) {
    console.log(error.response.data.error);
    return error.response.data.error
  }
}
