import http from "../http-common";
import authHeader from "../services/auth/authHeader";

class UserService {
  getAdminBoard(params) {
    return http.get("/board/admin", { headers: authHeader(), params });
  }
  findByUserName(username) {
    return http.get(`/board/admin?username=${username}`);
  }
}

export default new UserService();
