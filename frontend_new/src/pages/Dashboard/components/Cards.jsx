import React from 'react';
import dashboardglobaltree from '../../../assets/dashboardglobaltree.svg';
import dashboardBUtree from '../../../assets/dashboardBU.svg';

const Cards = () => {
    const cardInfo = [
        { title: "Árvore Global" },
        { title: "Árvore 545" },
        { title: "Árvore aaa" },
        { title: "Árvore bbb" },
        { title: "Árvore ccc" },
        { title: "Árvore ddd" }
    ];

    const RenderCard = (card, index) => {
        if (index === 0) {
            return (
                <div key={index} className="w-full flex justify-center p-4">
                    <div className="w-[70vw] md:w-[1184px] h-[135px] mx-auto bg-[#1094AB] rounded-lg p-6 shadow-md">
                        <img src={dashboardglobaltree} alt="Ícone da Árvore Global" className="w-18.5 h-16 rounded mx-auto" />
                        <h2 className="text-center text-white font-inter font-size-24px font-semibold text-2xl ">{card.title}</h2>
                    </div>
                </div>
            );
        } else {
            return (
                <div key={index} className="w-full md:w-1/3 flex justify-center p-2">
                    <div className="md:h-[127px] w-[362.67px] mx-auto bg-[#00C6D4] rounded-lg p-4 shadow-sm">
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
                    {RenderCard(cardInfo[0], 0)}
                    <div className="flex flex-wrap justify-center">
                        {cardInfo.slice(1).map((card, index) => RenderCard(card, index + 1))}
                    </div>
                </div>
            </div>
        </div>    
    );
};

export default Cards;
