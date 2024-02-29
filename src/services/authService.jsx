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

  register = async (username, fullName, email, password, address, phoneNumber) => {
    const data = {
      username: username,
      fullName: fullName,
      email: email,
      password: password,
      address: address,
      phoneNumber: phoneNumber
    };
    return await axios.post(API_REGISTER, data);
  };
}
