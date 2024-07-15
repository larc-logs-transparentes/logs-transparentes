import React, { useEffect, useState } from 'react';
import dashboardglobaltree from '../../../assets/dashboardglobaltree.svg';
import dashboardBUtree from '../../../assets/dashboardBU.svg';
import Modal from './Modal';

const Cards = () => {
    const [cardInfo, setCardInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        const fetchTreeData = async () => {
            try {
                const response = await fetch('http://localhost:8080/tree');
                if (!response.ok) {
                    throw new Error('Failed to fetch tree data');
                }
                const data = await response.json();
                const formattedTrees = formatTreeData(data.trees);
                setCardInfo(formattedTrees);
            } catch (error) {
                console.error('Error fetching tree data:', error);
            }
        };

        fetchTreeData();
    }, []);

    const formatTreeData = (trees) => {
        return trees.map((treeName) => ({
            title: treeName,
            subtitle: treeName.slice(-3),
            description: `Raiz da árvore ${treeName}`,
            downloadUrl: `http://localhost:8080/tree/all-roots-global-tree`,
            hash: `http://localhost:8080/tree/tree-root?tree_name=${treeName}`,
            allroots: `http://localhost:8080/tree/all-roots-global-tree`
        }));
    };

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
                        <h2 className="text-center text-white font-inter font-size-24px font-semibold text-2xl "> Árvore global</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index} className="w-full md:w-[362.67px] flex justify-center p-2" onClick={() => handleCardClick(card)}>
                    <div className="md:h-[127px] w-[362.67px] mx-auto bg-[#00C6D4] rounded-lg p-4 shadow-sm cursor-pointer">
                        <img src={dashboardBUtree} alt="Ícone das Árvore de BUS" className="w-16 h-14.5 rounded mx-auto" />
                        <h2 className="text-2xl text-black font-inter font-size-20px font-semibold text-center mb-2">Árvore {card.subtitle}</h2>
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
                    {cardInfo.length > 0 && renderCard(cardInfo[0], 0)}
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
