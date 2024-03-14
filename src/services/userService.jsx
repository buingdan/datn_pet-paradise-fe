import axios from "axios"
import { API_USER } from "./constant";

export default class UserService{

    getUsers = async () => {
        return await axios.get(API_USER);
    };

    updateUser = async (id, user) => {
        let formData = new FormData();
        formData.append("username", user.username)
        formData.append("fullName", user.fullName)
        formData.append("email", user.email)
        formData.append("address", user.address)
        formData.append("phoneNumber", user.phoneNumber)

        return await axios.put(API_USER + "/" + id, formData);
    };
    getUsersByUserName = async (params) => {
        return await axios.get(API_USER + "/get/find", { params });
    };
}
