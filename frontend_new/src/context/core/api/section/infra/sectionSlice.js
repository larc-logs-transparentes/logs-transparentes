import { apiSlice } from '../../apiSlice';

import bu_api_url from '../../../../../lib/server_config';

const endpointUrl = `${bu_api_url}/bu/`;

function getStatesByElection(electionId) {
  return `${endpointUrl}distinct_uf?id_eleicao=${electionId}`;
}

function getBuByInfo(estado, zona, secao) {
  return `${endpointUrl}find_by_info?UF=${estado}&zona=${zona}&secao=${secao}`;
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
