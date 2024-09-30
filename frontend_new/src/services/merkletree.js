import api from "../lib/api";
export async function getTrustedRoot() {
    const { data } = await api.get("/tree/tree-root?tree_name=global_tree");
    return data;
}
export async function getDataProof(id) {
    const { data } = await api.get(`/tree/data-proof?tree_name=eleicao_545&index=59`);
    return data;
}
