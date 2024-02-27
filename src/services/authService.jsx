import axios from "axios";
import { API_LOGIN, API_REGISTER } from "./constant";

export default class AuthService {
  login = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    return await axios.post(API_LOGIN, data);
  };

  register = async (username, fullname, email, password, address) => {
    const data = {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      address: address,
    };
    return await axios.post(API_REGISTER, data);
  };
}
