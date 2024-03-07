import electionIdToName from '../data/ElectionConverterData.json';

export const convertElectionIdToName = (id) => {
  return electionIdToName[id] || 'Eleição não selecionada'; 
};