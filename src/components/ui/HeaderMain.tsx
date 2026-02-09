interface Props {
  botonText: string;
  openModal: (arg: undefined) => void;
  title?: string;
}

export const HeaderMain = ({ botonText = 'Agregar', openModal, title }: Props) => {
  const click = () => {
    openModal(undefined);
  };
  return (
    <header className={`flex items-center m-5 ${title ? 'justify-between' : 'justify-end'} border-b border-[#B59E6B]/10 pb-4 mb-8`}>
      {title && <h2 className="text-xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-wide">{title}</h2>}
      <div className="flex">
        <button
          className="
            bg-[#B59E6B] text-[#2D2926] font-bold cursor-pointer rounded-sm 
            px-6 py-2 text-xs uppercase tracking-widest hover:opacity-90 
            transition-all duration-300 shadow-sm outline-none"
          onClick={click}
        >
          {botonText}
        </button>
      </div>
    </header>
  );
};
