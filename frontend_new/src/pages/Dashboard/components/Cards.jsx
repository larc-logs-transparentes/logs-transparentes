import React, { useState } from 'react';
import dashboardglobaltree from '../../../assets/dashboardglobaltree.svg';
import dashboardBUtree from '../../../assets/dashboardBU.svg';
import Modal from './Modal';

const Cards = () => {
    const cardInfo = [
        { title: "Árvore Global", subtitle: "global", description: "Contém a raiz de todas as árvores locais, garante a integridade de todos os dados eletorais.", downloadUrl: "http://localhost:8080/tree/all-leaf-data-global-tree"},
        { title: "Árvore 545", subtitle: "545" },
        { title: "Árvore aaa", subtitle: "aaa"},
        { title: "Árvore bbb", subtitle: "bbb" },
        { title: "Árvore ccc", subtitle: "ccc"},
        { title: "Árvore ddd", subtitle: "ddd"}
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    


    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const renderCard = (card, index) => {
        if (index === 0) {
            return (
                <div key={index} className="w-full flex justify-center p-4" onClick={() => handleCardClick(card)}>
                    <div className="w-[70vw] md:w-[1184px] h-[135px] mx-auto bg-[#1094AB] rounded-lg p-6 shadow-md cursor-pointer">
                        <img src={dashboardglobaltree} alt="Ícone da Árvore Global" className="w-18.5 h-16 rounded mx-auto" />
                        <h2 className="text-center text-white font-inter font-size-24px font-semibold text-2xl ">{card.title}</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index} className="w-full md:w-1/3 flex justify-center p-2" onClick={() => handleCardClick(card)}>
                    <div className="md:h-[127px] w-[362.67px] mx-auto bg-[#00C6D4] rounded-lg p-4 shadow-sm cursor-pointer">
                        <img src={dashboardBUtree} alt="Ícone das Árvore de BUS" className="w-16 h-14.5 rounded mx-auto" />
                        <h2 className="text-2xl text-black font-inter font-size-20px font-semibold text-center mb-2">{card.title}</h2>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="md:w-[1280px] mx-auto flex flex-col justify-center rounded-e ">   
            <div className="w-[80vw] md:w-[1232px] mx-auto flex flex-col justify-center border-2 border-blue-light rounded-2xl p-5 space-y-4">
                <h1 className="text-2xl text-blue-light font-inter font-size-24px text-left mb-4">Dashboard</h1>
                <div className="flex flex-col items-center space-y-4">
                    {renderCard(cardInfo[0], 0)}
                    <div className="flex flex-wrap justify-center">
                        {cardInfo.slice(1).map((card, index) => renderCard(card, index + 1))}
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} card={selectedCard} />
        </div>    
    );
};

export default Cards;
