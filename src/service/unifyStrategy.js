import axios from "axios";

export default {
  // 获取一统攻略
  getTips(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/tips", {params})
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
