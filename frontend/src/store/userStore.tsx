import { makeAutoObservable } from "mobx";
import { tsUser } from "../pages/index";

interface TsUserStore {
  setUser: (user: any) => void;
  user: any;
}

class UserStore implements TsUserStore {
  user: tsUser = {
    email: "",
    phone_number: "",
    user_name: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: any) => {
    this.user = user;
    localStorage.setItem('userDet', JSON.stringify(user))
  };
}

const userStoreInstance = new UserStore();

export default userStoreInstance;
