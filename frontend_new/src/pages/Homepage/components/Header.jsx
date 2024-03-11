  import React, { useState } from 'react';
  import '../../../index.css';
  import Mascara from '../../../assets/Mascara.svg';
  import Imutavel from '../../../assets/Imutavel.svg';
  import Distribuido from '../../../assets/Distribuido.svg';
  import Verificacao from '../../../assets/Verificacao.svg';

  function Header() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
      { src: Imutavel, title: 'Imutável', desc: 'Armazenamos os dados da eleição em logs transparentes, uma estrutura à prova de manipulações' },
      { src: Verificacao, title: 'Verificável', desc: 'Os eleitores verificam os dados individualmente, e os monitores verificam os dados como um todo' },
      { src: Distribuido, title: 'Distribuído', desc: 'Você pode escolher qualquer monitor para enviar suas verificações' }
    ];

    const handleScroll = (e) => {
      const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
      setActiveSlide(index);
    };

    return (
      <div className='overflow-x-hidden h-[70vh] md:h-[65vh] md:min-h-[600px]'>
      <div className='relative font-sans'>
        <div className='h-full text-center font-bold flex items-center justify-center relative'>
          <img src={Mascara} className='absolute right-0 h-[105px] w-[909px] top-0 ' alt='Mascara' />
          <div className='bg-blue md:h-[10.45vh] min-h-[105px] md:min-h-[105px] w-full absolute top-0 left-0 opacity-70'></div>
          <h1 className='text-white text-xl p-4 md:text-3xl md:p-8 mt-2 z-30'>
            Armazenamento Transparente de Dados da Eleição
          </h1>
        </div>
      </div>
      <div className='w-full bg-white py-4 h-[44vh]'>
        <h1 className='text-center md:text-2xl text-lg p-8 relative font-sans font-bold'>
          Como Funciona
        </h1>
      <div onScroll={handleScroll} className="flex overflow-x-scroll scrollbar-hidden snap-x snap-mandatory md:snap-none md:justify-center md:gap-[5vw] lg:gap-[15vw]">
          {slides.map((item, index) => (
            <div key={index} className="flex-none w-full snap-start md:snap-none md:w-64 min-w-[140px]">
              <div className='flex flex-col items-center w-full '>
                <img src={item.src} alt='Monitor' className='max-h-[160px] min-h-[120px] h-[40vw] md:h-[20vh] md:w-auto '/>
                <h2 className='text-blue-500 text-center text-blue font-sans font-bold md:text-xl text-lg mt-8'>{item.title}</h2>
                <p className='text-black text-center font-sans font-bold md:text-base text-sm max-w-[200px]'>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center p-2 md:hidden'>
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
