import http from "../http-common";
class BuDataService {
  getAll() {
    return http.get("/bu");
  }
  get(id) {
    return http.get(`/bu/${id}`);
  }
  create(data) {
    return http.post("/bu", data);
  }
  update(id, data) {
    return http.put(`/bu/${id}`, data);
  }
  findByTitle(title) {
    return http.get(`/bu?title=${title}`);
  }
}
export default new BuDataService();