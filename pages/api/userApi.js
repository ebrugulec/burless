import axios from 'axios'
import {checkEnvironmentAndGetUrl} from "../../utils";

export const login = async ({ email, password }) => {
  console.log('checkEnvironmentAndGetUrl()', checkEnvironmentAndGetUrl())
  const response = await axios.post(`/api/login`, {
    email,
    password,
  })
  return new Promise(async (resolve, reject) => {
    response && response.data ? resolve(response) : reject(response)
  });
};

export const register = async ({ username, email, password }) => {
  const response = await axios.post(`/api/signup`, {
    username,
    email,
    password,
  });
  return new Promise(async (resolve, reject) => {
    response && response.data ? resolve(response) : reject(response)
  });
};

export const getUser = async () => {
  try {
    let res = await axios.get(`/api/me`);

    return res.data.user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout = async () => {
  try {
    await axios.get(`/api/auth/logout`)
  } catch (error) {
    console.log(error)
  }
}
