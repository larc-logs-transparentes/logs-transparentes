import electionIdToName from '../data/ElectionFormatted.json';

export const convertElectionIdToName = (id) => {
  return electionIdToName[id] || 'Eleição não selecionada'; 
};