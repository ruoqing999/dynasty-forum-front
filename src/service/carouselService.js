import axios from "axios";

export default {
  // 获取走马灯
  getCarouselList(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/carousel/list", {params})
          .then((res) => resolve(res))
          .catch((err) => reject(err));
    });
  },

};
