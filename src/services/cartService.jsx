import axios from "axios"
import { API_CART } from "./constant";
// import axiosInstance from "../config/axiosInterceptor";

export default class CartService{
    addToCart= async (cart) => {
        return await axios.post(API_CART + "/add", cart);
        // return await axiosInstance.post(API_CART + "/add", cart);
    };

    removeToCart= async (idCart) => {
        return await axios.delete(API_CART + "/remove/" + idCart);
        // return await axiosInstance.delete(API_CART + "/remove/" + idCart);
    };

    getItemsCart= async (idUser) => {
        return await axios.get(API_CART + "/items/" + idUser);
        // return await axiosInstance.get(API_CART + "/items/" + idUser);
    };
    updateQuantity = async (idUser, quantity) => {
        return await axios.put(API_CART + "/updateQuantity/" + idUser + "?quantity=" + quantity);
    };
}