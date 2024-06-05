import axios from "axios"
import { API_ORDER } from "./constant";
// import axiosInstance from "../config/axiosInterceptor";

export default class OrderService{

    getOrders = async () => {
        return await axios.get(API_ORDER);
        // return await axiosInstance.get(API_USER);
    };

    updateOrder = async (id, user) => {
        let formData = new FormData();
        formData.append("username", user.username)
        formData.append("fullName", user.fullName)
        formData.append("email", user.email)
        formData.append("address", user.address)
        formData.append("phoneNumber", user.phoneNumber)

        return await axios.put(API_ORDER + "/" + id, formData);
    };

    getOrdersByUserName = async (params) => {
        return await axios.get(API_ORDER + "/get/find", { params });
    };
}
