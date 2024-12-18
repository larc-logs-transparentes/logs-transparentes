import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../index.css';
import Mascara from '../../../assets/Mascara.svg';
import Imutavel from '../../../assets/Imutavel.svg';
import Distribuido from '../../../assets/Distribuido.svg';
import Verificacao from '../../../assets/Verificacao.svg';

function Header() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { src: Imutavel, title: 'Imutável', desc: 'Armazenamos dos dados das eleições em logs imutáveis e transparentes, à prova de manipulações' },
    { src: Verificacao, title: 'Verificável', desc: 'Confira você mesmo os dados do TSE e calcule o resultado da eleição' },
    { src: Distribuido, title: 'Distribuído', desc: 'Qualquer entidade pode monitorar o nosso trabalho e o do TSE' }
  ];

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
    setActiveSlide(index);
  };

  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/about');
  };

  return (
    <div className='overflow-hidden h-[550px] md:h-[700px] lg:h-[670px] xl:h-[630px]'>
      <div className="relative font-sans">
        <div className="h-full text-center font-bold flex items-center justify-center relative">
          <img
            src={Mascara}
            className="absolute right-0 h-[105px] w-[909px] top-0 z-10"
            alt="Mascara"
          />
          <div className="bg-blue opacity-70 h-[90px] md:h-[105px] w-full absolute top-0 left-0 z-10"></div>
          <h1 className="text-white text-xl p-4 md:text-3xl font-normal md:p-6 lg:p-8 z-20 flex items-center">
            Armazenamento Transparente de Dados da Eleição
          </h1>
        </div>
      </div>

      <div className='w-full md:h-[50vh]'>
        <div onScroll={handleScroll} className="flex overflow-x-scroll scrollbar-hidden snap-x snap-mandatory md:snap-none md:justify-center md:mt-[65px] md:gap-[5vw] lg:gap-[10vw]">
          {slides.map((item, index) => (
            <div key={index} className="flex-none w-full snap-start md:snap-none md:w-[20%] min-w-[140px] shadow-xl rounded-xl md:mb-8 border-bordergray border-[2px] p-6">
              <div className='flex flex-col items-center w-full'>
                <img src={item.src} alt='Monitor' className='max-h-[160px] min-h-[120px] h-[40vw] md:h-[20vh] md:w-auto ' />
                <h2 className='text-blue-500 text-center text-blue font-sans font-bold md:text-xl text-lg mt-8'>{item.title}</h2>
                <p className='text-black text-center font-sans font-bold md:text-base text-sm max-w-[200px]'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='text-center  text-md relative font-sans font-bold text-black underline mt-[20px] md:mt-0'>
          <button onClick={handleButtonClick} className="rounded-full bg-yellow hover:bg-blue-light px-2 h-[40px] w-[130px]">Saiba Mais</button>
        </div>

        <div className='flex justify-center md:hidden p-3 mt-2'>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 bg-${index === activeSlide ? 'blue' : 'white'} border-[0.3px] rounded-full mx-1 cursor-pointer`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
