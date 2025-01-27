import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../lib/api";
async function getResource(path, external) {
    if (external) {
        const { data } = await axios.get(path);
        return data;
    }
    const { data } = await api.get(path);
    return data;
}
export default function useRequest(path, options = {
    external: false,
}) {
    return useQuery({
        queryFn: () => getResource(path, options?.external || false),
        queryKey: [path],
        ...options,
    });
}
