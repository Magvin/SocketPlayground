import UserStore from "./user";

export default class AppStore {
  user = new UserStore(this);
}
