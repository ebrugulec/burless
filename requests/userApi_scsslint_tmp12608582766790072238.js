import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
console.log('BASE_URL', BASE_URL)
export const login = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/login`, {
    email,
    password,
  });
  console.log('reso', response)
  return new Promise(async (resolve, reject) => {
    response && response.data ? resolve(response) : reject(response)
  });
};

export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post('/api/auth/login', {
      username,
      email,
      password,
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async () => {
  try {
    let res = await axios.get('/api/auth/me')

    return res.data.user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout = async () => {
  try {
    await axios.get('/api/auth/logout')
  } catch (error) {
    console.log(error)
  }
}
