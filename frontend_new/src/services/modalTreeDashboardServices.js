export const fetchRootValue = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('Erro ao buscar valor do hash:', error);
    return 'Erro ao carregar valor';
  }
};

export const fetchNumberOfElementsOnTree = async (url, isFirst) => {
  try {
    const response = await fetch(isFirst ? 'http://localhost:8080/tree/all-roots-global-tree' : url);
    const data = await response.json();
    return isFirst ? data.roots[data.roots.length - 1].tree_size : data.length;
  } catch (error) {
    console.error('Erro ao buscar valor do número:', error);
    return 'Erro ao carregar valor';
  }
};

export const fetchRootTimestampValue = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const lastTimestamp = data.timestamp;
    return new Date(lastTimestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch (error) {
    console.error('Erro ao buscar valor do timestamp:', error);
    return 'Erro ao carregar valor';
  }
};

export const downloadFile = async (url, filename) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro ao baixar o arquivo');

    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Erro ao fazer download:', error);
    alert('Erro ao fazer download.');
  }
};
