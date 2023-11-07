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
      <div className='overflow-x-hidden'>
      <div className='relative font-sans z-10'>
        <div className='h-full text-center font-bold flex items-center justify-center relative'>
          <img src={Mascara} className='absolute  right-0 h-[105px] w-[909px] z-10' alt='Mascara' />
          <div className='bg-blue h-[105px] w-full absolute top-0 left-0 z-10 opacity-70'></div>
          <h1 className='text-white text-xl p-4 md:text-3xl md:p-8 z-20 mt-2 '>
            Armazenamento Transparente de Dados da Eleição
          </h1>
        </div>
      </div>

      {/* Consider adding a separate div for visual separation */}
      <div className='w-full bg-white py-4 h-[44vh]'>
        <h1 className='text-center md:text-2xl text-lg p-8 z-20 relative font-sans font-bold'>
          Como Funciona
        </h1>
      <div onScroll={handleScroll} className="flex overflow-x-scroll scrollbar-hidden snap-x snap-mandatory md:snap-none md:justify-center md:gap-50 lg:gap-64">
          {slides.map((item, index) => (
            <div key={index} className="flex-none w-full snap-start md:snap-none md:w-64">
              <div className='flex flex-col items-center w-full'>
                <img src={item.src} alt='Monitor' className='w-1/2 md:w-auto'/>
                <h2 className='text-blue-500 text-center text-blue font-sans font-bold md:text-xl text-lg mt-8'>{item.title}</h2>
                <p className='text-black text-center font-sans font-bold md:text-base text-sm'>{item.desc}</p>
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
