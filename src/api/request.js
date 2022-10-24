import axios from "axios";
import { TaroAdapter } from "axios-taro-adapter";

const request = axios.create({
  baseURL: 'http://175.178.108.114:10010/',
  timeout: 5000,
  adapter: TaroAdapter,
  headers: {
    'Content-Type':'application/json;charset=utf-8'
  },
})

export default request