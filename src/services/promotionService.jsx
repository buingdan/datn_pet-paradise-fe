import axios from "axios"
import { API_PROMOTION } from "./constant";

export default class PromotionService{
    insertPromotion= async (promotion) => {
        return await axios.post(API_PROMOTION, promotion);
    };

    getPromotions = async () => {
        return await axios.get(API_PROMOTION);
    };

    deletePromotion = async (id) => {
        return await axios.delete(API_PROMOTION + "/" + id);
    };

    getPromotion= async (id) => {
        return await axios.get(API_PROMOTION + "/" + id + "/get");

    };

    updatePromotion = async (id, promotion) => {
        return await axios.put(API_PROMOTION + "/" + id, promotion);

    };
    getPromotionsByPromotionName = async (params) => {
        return await axios.get(API_PROMOTION + "/get/find", { params });
    };
}
