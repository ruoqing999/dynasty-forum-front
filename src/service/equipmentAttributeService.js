import axios from "axios";

export default {
  // 获取装备属性
  getPageEquipment(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/equipment/pageEquipment", {params})
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};
