import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FDFCFB] text-[#2D2926] p-6 selection:bg-[#B59E6B]/20">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Elemento de Firma: Estética de Hotel */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 bg-[#B59E6B]/10 rounded-full flex items-center justify-center border border-[#B59E6B]/20">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#B59E6B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6v12a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0Z" />
              <path d="M15 9h6" />
              <path d="M3 11h10" />
              <path d="M3 15h10" />
              <path d="M3 7h10" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 bg-white px-2 py-1 border border-[#B59E6B]/30 rounded text-[9px] uppercase tracking-widest font-bold text-[#B59E6B]">Fuera de Registro</div>
        </div>

        <div className="space-y-4">
          <h1 className="text-8xl font-serif font-light tracking-tighter text-[#2D2926]/90">404</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif text-[#2D2926]">Habitación no encontrada</h2>
            <p className="text-[#2D2926]/60 max-w-[280px] mx-auto text-sm leading-relaxed">Parece que el ala que busca está en mantenimiento o la habitación no ha sido asignada aún.</p>
          </div>
        </div>

        <div className="pt-6">
          <Link to="/" className="group relative inline-flex items-center justify-center px-10 py-3 bg-[#2D2926] text-[#FDFCFB] rounded-sm transition-all duration-500 overflow-hidden">
            <span className="relative z-10 text-xs uppercase tracking-[0.2em] font-medium">Volver a Recepción</span>
            <div className="absolute inset-0 bg-[#B59E6B] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
        </div>

        <footer className="pt-16">{/* <p className="text-[10px] uppercase tracking-[0.3em] text-[#2D2926]/30">NovaTech &bull; Hotel Management</p> */}</footer>
      </div>
    </div>
  );
};
