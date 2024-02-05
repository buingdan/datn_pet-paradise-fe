import axios from "axios"
import { API_PRODUCT} from "./constant";

export default class ProductService{
    insertProduct = async (product) => {
        let formData = new FormData();

        formData.append("name", product.name)
        formData.append("discount", product.discount)
        formData.append("price", product.price)
        formData.append("quantityInStock", product.quantityInStock)
        formData.append("voteAverage", product.voteAverage)

        if(product.imgFile[0].originFileObj){
            formData.append("imgFile", product.imgFile[0].originFileObj)
        }
        
        return await axios.post(API_PRODUCT, formData);
    };

    getProducts = async () => {
        return await axios.get(API_PRODUCT);
    };

    getProductsByName = async (params) => {
        return await axios.get(API_PRODUCT + "/find", { params });
    };

    deleteProduct = async (id) => {
        return await axios.delete(API_PRODUCT + "/" + id);
    };
    
    static getProductLogoUrl = (filename) => {
        return API_PRODUCT + "/logo/" + filename;
    };

    getProduct = async (id) => {
        return await axios.get(API_PRODUCT + "/" + id + "/get");
    };

    updateProduct = async (id, product) => {
        let formData = new FormData();
        formData.append("name", product.name)
        formData.append("discount", product.discount)
        formData.append("price", product.price)
        formData.append("quantityInStock", product.quantityInStock)
        formData.append("voteAverage", product.voteAverage)

        if(product.imgFile[0].originFileObj){
            formData.append("imgFile", product.imgFile[0].originFileObj)
        }
        return await axios.put(API_PRODUCT + "/" + id, formData);
    };
}
