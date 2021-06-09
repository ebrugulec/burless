import axios from 'axios'
import {checkEnvironmentAndGetUrl} from "../../utils";
import {server} from "../../config";

export const login = async ({ email, password }) => {
  const response = await axios.post(`${server}/api/login`, {
    email,
    password,
  })
  return new Promise(async (resolve, reject) => {
    response && response.data ? resolve(response) : reject(response)
  });
};

export const register = async ({ username, email, password }) => {
  const response = await axios.post(`${server}/api/signup`, {
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
    let res = await axios.get(`${server}/api/me`);

    return res.data.user
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout = async () => {
  try {
    await axios.get(`${server}/api/auth/logout`)
  } catch (error) {
    console.log(error)
  }
}
