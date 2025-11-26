import { useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-black">{pathname[1]?.toUpperCase() + pathname.slice(2)}</h1>
      <div className="flex items-center gap-2">
        {/* Imagen de usuario redonda */}
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Usuario" className="w-8 h-8 rounded-full object-cover" />
        <span className="font-medium text-slate-700">Usuario</span>
      </div>
    </header>
  );
};

export default Header;
