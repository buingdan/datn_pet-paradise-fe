import axios from "axios"
import { API_CART } from "./constant";

export default class CartService{
    addToCart= async (cart) => {
        return await axios.post(API_CART + "/add", cart);
    };

    removeToCart= async (idCart) => {
        return await axios.delete(API_CART + "/remove/" + idCart);
    };

    getItemsCart= async (idUser) => {
        return await axios.get(API_CART + "/items/" + idUser);
    };
}