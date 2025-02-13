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
                const treeList = await fetch('http://localhost:8080/tree');
                if (!treeList.ok) {
                    throw new Error('Failed to fetch tree list data');
                }
                const data = await treeList.json();
                const formattedTrees = formatTreeData(data.trees);
                setCardInfo(formattedTrees);
            } catch (error) {
                console.error('Error fetching tree list data:', error);
            }
        };

        fetchTreeData();
    }, []);

    const formatTreeData = (trees) => {
        return trees.map((treeName) => ({
            title: treeName,
            treeIndex: treeName.slice(-3),
            description: `Eleição`,
            downloadLeavesUrl: `http://localhost:8080/bu/find_by_merkletree_index_range?election_id=${treeName.slice(-3)}&initial_index=0&final_index=100000000`,
            treeInfoUrl: `http://localhost:8080/tree/tree-root?tree_name=${treeName}`,
            downloadAllGlobalRootsUrl: 'http://localhost:8080/tree/all-roots-global-tree'
        }));
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setIsModalOpen(true);
    };

    const renderCard = (card, index) => {
        if (index === 0) {
            return (
                <div key={index} className="w-full flex justify-center p-2" onClick={() => handleCardClick(card)}>
                    <div className="w-full max-w-[90vw] h-[100px] md:h-[135px] mx-auto bg-[#1094AB] rounded-lg p-4 md:p-6 shadow-md cursor-pointer">
                        <img src={dashboardglobaltree} alt="Ícone da Árvore Global" className="w-14 md:w-18 h-12 md:h-16 mx-auto" />
                        <h2 className="text-center text-white font-inter text-lg md:text-2xl font-semibold">Árvore global</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div 
                    key={index} 
                    className="w-full sm:w-1/2 md:w-1/3 flex justify-center p-2" 
                    onClick={() => handleCardClick(card)}
                >
                    <div className="md:flex-col w-full max-w-[90vw] sm:max-w-[48vw] md:max-w-[33vw] h-[100px] md:h-[127px] bg-[#00C6D4] rounded-lg p-4 shadow-sm cursor-pointer">
                        <img 
                            src={dashboardBUtree} 
                            alt="Ícone das Árvore de BUS" 
                            className="w-12 md:w-16 h-10 md:h-14 mx-auto" 
                        />
                        <div className=" truncate text-lg md:text-xl text-black font-inter font-semibold text-center mb-2">
                            Árvore de BUs - {card.treeIndex}
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="w-full flex flex-col items-center p-6">
            <div className="w-full max-w-[95vw] h-auto flex flex-col border border-blue rounded-2xl overflow-hidden m-6">
                <h1 className="text-2xl text-[#1094AB] font-inter font-semibold pl-6 pt-6">
                    Dashboard
                </h1>
                <div className="flex flex-col justify-center flex-grow gap-4 p-4">
                    {cardInfo.length > 0 && renderCard(cardInfo[0], 0)}
                    <div className="flex-wrap flex flex-col sm:flex-row justify-center">
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
