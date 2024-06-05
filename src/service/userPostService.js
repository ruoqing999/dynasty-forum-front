import axios from "axios";

export default {

  userPost(data) {
    return new Promise((resolve, reject) => {
      axios.post("/api/userPost",  data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

};