import axios from "axios";

export default {

  getCategoryList(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/category/list", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

};