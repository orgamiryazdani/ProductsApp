import http from "./httpService";

export function getCategory(value){
    return http.get(value);
}
