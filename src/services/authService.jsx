import axios from "axios";
import { API_LOGIN, API_REGISTER } from "./constant";

export default class AuthService {
  Login = async (email, password) => {
    const data = {
      email: email,
      password: password,
    };
    return await axios.post(API_LOGIN, data);
  };

  Register = async (username, fullname, email, password, image, address) => {
    const data = {
      username: username,
      fullname: fullname,
      email: email,
      password: password,
      image: image,
      address: address,
    };
    return await axios.post(API_REGISTER, data);
  };
}
