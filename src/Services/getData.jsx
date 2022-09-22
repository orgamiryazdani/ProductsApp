import http from "./httpService";

export function getData(value){
    return http.get(value);
}