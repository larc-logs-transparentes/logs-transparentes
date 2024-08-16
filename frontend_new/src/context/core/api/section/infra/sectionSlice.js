import { apiSlice } from '../../apiSlice';

const endpointUrl = '/bu/distinct_uf';

function getStatesByElection(electionId) {
  return `${endpointUrl}?id_eleicao=${electionId}`;
}

export const sectionApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getStatesByElection: query({
      query: getStatesByElection,
      provideTags: ['Sections'],
    }),
  }),
});

export const { useGetStatesByElectionQuery } = sectionApiSlice;
