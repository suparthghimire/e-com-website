import {BASE_URL} from "../config"; 
export const GET_SINGLE_PRODUCT = async (slug)=>{
    try {
        const response = await fetch(`${BASE_URL}/product/${slug}/`);
        const product = await response.json();
        if(response.status===404){
            const error = new Error("Page Not Found");
            error.status = response.status;
            error.data = "Product Not Found";
            throw error;
        }
        else if(response.status!==200){
            const error = new Error("Unexpected Error");
            error.status = response.status;
            error.data = "Unexpected Error";
            throw error;
        }
        console.log(product);
        return [product, null];
 
    } catch (error) {
        console.error(error);
        return [null, error];
    }
}