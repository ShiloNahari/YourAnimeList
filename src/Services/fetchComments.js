import http from "./httpService";

export const getAllComments = async() =>{
  const comments = await http.get('/anime/comments')
  return (comments.data);
}

export const postComment = async(data) => {
  const response = await http.post('/anime/comments', data)
  console.log(response);

}