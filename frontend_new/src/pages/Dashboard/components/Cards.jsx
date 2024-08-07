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
            description: `Raiz da árvore ${treeName.slice(-3)}`,
            downloadUrl: `http://localhost:8080/bu/find_by_merkletree_index_range?election_id=${treeName}`,
            hash: `http://localhost:8080/tree/tree-root?tree_name=${treeName}`,
            info: `http://localhost:8080/tree/?tree_name=${treeName}`,
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
                <div key={index} className="w-full flex justify-center p-2 md:p-4" onClick={() => handleCardClick(card)}>
                    <div className="w-[90vw] md:w-[1184px] h-[100px] md:h-[135px] mx-auto bg-[#1094AB] rounded-lg p-4 md:p-6 shadow-md cursor-pointer">
                        <img src={dashboardglobaltree} alt="Ícone da Árvore Global" className="w-16 md:w-18.5 h-14 md:h-16 rounded mx-auto" />
                        <h2 className="text-center text-white font-inter text-lg md:text-2xl font-semibold">Árvore global</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index} className="w-full sm:w-[45vw] md:w-[362.67px] flex justify-center p-2" onClick={() => handleCardClick(card)}>
                    <div className="h-[100px] md:h-[127px] w-full bg-[#00C6D4] rounded-lg p-4 shadow-sm cursor-pointer">
                        <img src={dashboardBUtree} alt="Ícone das Árvore de BUS" className="w-14 md:w-16 h-12 md:h-14.5 rounded mx-auto" />
                        <h2 className="text-lg md:text-2xl text-black font-inter font-semibold text-center mb-2">Árvore {card.subtitle}</h2>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="w-[90vw] md:w-[1280px] mx-auto flex flex-col justify-center rounded-e">
            <div className="w-[90vw] md:w-[1232px] mx-auto flex flex-col justify-center border-2 border-blue-light rounded-2xl p-4 md:p-5 space-y-4">
                <h1 className="text-xl md:text-2xl text-blue-light font-inter mb-4">Dashboard</h1>
                <div className="flex flex-col items-center space-y-4">
                    {cardInfo.length > 0 && renderCard(cardInfo[0], 0)}
                    <div className="flex items-center flex-wrap justify-center gap-4">
                        {cardInfo.slice(1).map((card, index) => renderCard(card, index + 1))}
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                card={selectedCard} 
                isFirst={selectedCard && selectedCard.title === cardInfo[0].title} 
            />
        </div>    
    );
};

export default Cards;
