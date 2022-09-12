import http from "./htpService";

export function getCategory(value){
    return http.get(value);
}
