import http from "./htpService";

export function getData(value){
    return http.get(value);
}