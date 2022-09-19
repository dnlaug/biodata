import http from "../http-common";
import authHeader from "../services/auth/authHeader";

class BioDataService {
  getAll(params) {
    return http.get("/data/table", { headers: authHeader(), params });
  }

  create(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/data/upload", formData, {
      headers: authHeader(),
      "Content-Type": "multipart/form-data",
      onUploadProgress,
    });
  }

  deleteAll() {
    return http.delete("/data/delete", {
      headers: authHeader(),
    });
  }

  findByTargetName(targetName) {
    return http.get(`/data/table?targetName=${targetName}`);
  }
}

export default new BioDataService();
