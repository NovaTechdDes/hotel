interface Props {
  title: string;
  Icon: React.ElementType;
  colorIcon: string;
  numero: string;
  text: string;
}

export const TarjetaReporte = ({ title, colorIcon, Icon, numero, text }: Props) => {
  return (
    <div className="group bg-white dark:bg-[#2D2926] p-8 rounded-sm border border-[#B59E6B]/10 shadow-[var(--shadow-boutique)] hover:shadow-[var(--shadow-boutique-lg)] transition-all duration-500 relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-[#B59E6B]/5 rounded-sm group-hover:bg-[#B59E6B]/10 transition-colors">
          <Icon size={22} className="text-[#B59E6B]" style={{ color: colorIcon !== '#00f' && colorIcon !== '#0f0' ? colorIcon : '#B59E6B' }} />
        </div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-[#2D2926]/40 dark:text-[#FDFCFB]/30 font-bold">{text}</p>
      </div>

      <div className="space-y-1 relative z-10">
        <h3 className="text-4xl font-serif text-[#2D2926] dark:text-[#FDFCFB] tracking-tighter leading-none">{numero}</h3>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#B59E6B] font-bold opacity-80 group-hover:opacity-100 transition-opacity">{title}</p>
      </div>

      <div className="absolute -right-4 -bottom-4 opacity-[0.02] dark:opacity-[0.04] pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
        <Icon size={100} />
      </div>
    </div>
  );
};
