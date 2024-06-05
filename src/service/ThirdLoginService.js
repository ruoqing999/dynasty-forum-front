import axios from "axios";

export default {
  // qq登录
  qqLogin(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/auth/qqUrl", {params})
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  logout(data) {
    return new Promise((resolve, reject) => {
      axios.get("/api/auth/logout", data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }


}