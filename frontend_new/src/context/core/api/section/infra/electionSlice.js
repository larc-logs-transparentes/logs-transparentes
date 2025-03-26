import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../apiSlice';
import bu_api_url from '../../../../../lib/server_config';

const endpointUrl = `${bu_api_url}/bu/`;

function getElections() {
  return `${endpointUrl}distinct_eleicoes`;
}

function getElectionById(electionId) {
  return `${endpointUrl}election?id=${electionId}`;
}

const initialState = {
  selectedElection: '',
  electionOptions: [],
};

const electionSlice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    setSelectedElection: (state, action) => {
      state.selectedElection = action.payload;
    },
    setElectionOptions: (state, action) => {
      state.electionOptions = action.payload;
    },
  },
});

export const { setSelectedElection, setElectionOptions } = electionSlice.actions;

export const electionApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getElections: query({
      query: getElections,
      provideTags: ['Elections'],
    }),
    getElectionById: query({
      query: getElectionById,
      providesTags: ['Elections'],
    }),
  }),
});

export const { useGetElectionsQuery, useGetElectionByIdQuery } = electionApiSlice;
export default electionSlice.reducer;