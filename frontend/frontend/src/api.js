import axios from "axios"
const BASEURL = "http://localhost:3001"
const GETTYPES = BASEURL + "/types"
const GETCRYPTO = BASEURL + "/crypto/"
export function getCryptoTypes(){
    return axios.get(GETTYPES).then(res=>[null,res]).catch((err)=>[err])
}
export function getCrypto(name){
    return axios.get(GETCRYPTO+name).then(res=>[null,res]).catch((err)=>[err])
}