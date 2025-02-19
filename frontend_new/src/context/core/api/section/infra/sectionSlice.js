import { apiSlice } from '../../apiSlice';

const endpointUrl = process.env.REACT_APP_API_URL;

function getStatesByElection(electionId) {
  return `${endpointUrl}/distinct_uf?id_eleicao=${electionId}`;
}

function getBuByInfo(estado, zona, secao) {
  return `${endpointUrl}/find_by_info?UF=${estado}&zona=${zona}&secao=${secao}`;
}

export const sectionApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getStatesByElection: query({
      query: getStatesByElection,
      provideTags: ['Sections'],
    }),
    getBuByInfo: query({
      query: getBuByInfo,
      providesTags: ['Sections'],
    }),
  }),
});

export const { useGetStatesByElectionQuery } = sectionApiSlice;
