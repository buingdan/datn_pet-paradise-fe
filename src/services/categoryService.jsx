import axios from "axios"
import { API_CATEGORY } from "./constant";

export default class CategoryService{
    insertCategory = async (category) => {
        return await axios.post(API_CATEGORY, category);
    };

    getCategories = async () => {
        return await axios.get(API_CATEGORY);
    };

    deleteCategory = async (id) => {
        return await axios.delete(API_CATEGORY + "/" + id);
    };

    getCategory = async (id) => {
        return await axios.get(API_CATEGORY + "/" + id + "/get");
    };

    updateCategory = async (id, category) => {
        return await axios.put(API_CATEGORY + "/" + id, category);
    };
}
