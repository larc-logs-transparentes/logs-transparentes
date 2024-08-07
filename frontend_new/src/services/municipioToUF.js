import municipioUfData from './municipio_uf_data.json';

export async function getUFfromMunicipio(municipio) {
    const entry = municipioUfData.find(item => item.municipio === municipio);
    return entry ? entry.uf : null;
}