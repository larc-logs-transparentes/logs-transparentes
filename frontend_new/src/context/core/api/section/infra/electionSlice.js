import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../apiSlice';

const endpointUrl = process.env.REACT_APP_API_URL;

function getElections() {
  return `${endpointUrl}/distinct_eleicoes`;
}

function getElectionById(electionId) {
  return `${endpointUrl}/election?id=${electionId}`;
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