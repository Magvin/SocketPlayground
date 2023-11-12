import { makeAutoObservable } from "mobx";
import { SomeObject } from "../types/SomeObject";
import AppStore from "./app";

export interface IFile {
  id: number;
  title: string;
  data: SomeObject<string>;
}

export default class UserStore {
  name: string | null = null;
  file: IFile | null = null;

  constructor(private store: AppStore) {
    makeAutoObservable(this);
  }

  setUser = (name: string) => {
    this.name = name;
  };

  selectedFiles = (file: IFile) => {
    this.file = file;
  };

  changeFileValue = (value: SomeObject<string>) => {
    if (!this.file || !value) return;
    this.file.data = value;
  };
}
