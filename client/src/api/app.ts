import { AxiosInstance } from "axios";
import AppStore from "../stores/app";
import transport from "./transport";

export default class AppApi {
  client: AxiosInstance;
  constructor(store: AppStore, private baseURL?: string) {
    this.client = transport({}, baseURL);
  }
}
