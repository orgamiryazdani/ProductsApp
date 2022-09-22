import http from "./httpService";

export function getOneProduct(value){
    return http.get(value);
}