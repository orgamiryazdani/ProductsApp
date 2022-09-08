import http from "./htpService";

export function getData(){
    return http.get();
}