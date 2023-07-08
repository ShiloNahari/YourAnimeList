import http from "./httpService";

const options = {
  method: 'GET',
  params: {
    page: '1',
    size: '100',
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_X_RapidAPI_Key,
    "X-RapidAPI-Host": process.env.REACT_APP_X_RapidAPI_Host
  }
}

export const getAllAnimes = async () => {
  try {
    const hi = await http.get(process.env.REACT_APP_URL, options)

    console.log(hi.headers["x-ratelimit-requests-remaining"])
    return hi.data.data
  } catch (err) {
    console.log(err);
    return 'error'
  }
}

export const register = async (username,email, password,check) => {

}
