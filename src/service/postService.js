import axios from "axios";

export default {

  pagePost(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/post/pagePost", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getPostCount(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/post/getPostCount", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  post(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/post", data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  detail(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/post", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  del(params) {
    return new Promise((resolve, reject) => {
      axios.delete("/api/post", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  put(data) {
    return new Promise((resolve, reject) => {
      axios.put("/api/post", data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  listApprovePost(params) {
    return new Promise((resolve, reject) => {
      axios.get("/api/userPost/listApprovePost", { params })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

};