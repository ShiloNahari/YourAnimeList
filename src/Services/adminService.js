import http from "./httpService";

export const getAllUsers = async () => {
  const users = await http.get('/api/users')
  return (users.data.data);
}

export const deleteUserById = async(id) => {
  const user = await http.delete(`/api/users/${id}`)
  if (user.status === 200) return user.data.deleted

}

export const editUserById = async(id, data) => {
  if (data.role !== 'admin') {
    data.role = 'user'
  }
  const user = await http.put(`/api/users/${id}`, data)
  return user
}