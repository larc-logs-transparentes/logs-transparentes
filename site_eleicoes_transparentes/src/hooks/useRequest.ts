import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "lib/api";

async function getResource<T>(path: string, external: boolean) {
  if (external) {
    const { data } = await axios.get<T>(path);

    return data;
  }

  const { data } = await api.get<T>(path);

  return data;
}

type UseRequestOptions = Partial<{
  external: boolean;
  enabled: boolean;
}>;

export default function useRequest<T>(
  path: string,
  options: UseRequestOptions = {
    external: false,
  },
) {
  return useQuery({
    queryFn: () => getResource<T>(path, options?.external || false),
    queryKey: [path],
    ...options,
  });
}
