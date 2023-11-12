import AppStore from "../stores/app";

import { makeAutoObservable } from "mobx";
export default class User {
  name: string;

  constructor(private store: AppStore, user: string) {
    this.name = user;
    makeAutoObservable(this);
  }
}
