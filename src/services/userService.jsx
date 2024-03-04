import axios from "axios"
import { API_USER } from "./constant";

export default class UserService{

    getUsers = async () => {
        return await axios.get(API_USER);
    };

}
