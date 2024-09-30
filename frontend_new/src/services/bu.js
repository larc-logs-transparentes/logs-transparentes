import api from "../lib/api";
export async function getBuById(id) {
    const { data } = await api.get(`/bu/find_by_id?id=${id}`);
    return data;
}
