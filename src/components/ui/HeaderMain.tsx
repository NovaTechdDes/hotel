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
    <header className={`text-black dark:text-white flex dark:bg-slate-800  m-5 ${title ? 'justify-between' : 'justify-end'}`}>
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      <div className="flex">
        <button
          className="
            border border-gray-300 bg-blue-700 text-white
           dark:text-black font-bold cursor-pointer rounded-lg 
           px-2 py-1 text-md hover:bg-blue-600 transition-all duration-200 
           dark:border-gray-600 dark:bg-white dark:hover:bg-blue-600 dark:hover:text-white"
          onClick={click}
        >
          {botonText}
        </button>
      </div>
    </header>
  );
};
