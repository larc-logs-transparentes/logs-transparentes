import React, { useContext } from 'react';
import StoreContext from 'components/Store/Context';
import './Home.css';

const PagesHome = () => {
    const { setToken } = useContext(StoreContext);
    return (
        <div className="pages-home">
            Página Inicial de Boletins de Urna
            <br/>
            <button type="button" onClick={() => setToken(null)}>
                Sair
            </button>
        </div>
    );
};

export default PagesHome;