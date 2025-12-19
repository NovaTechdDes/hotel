import { Outlet } from 'react-router-dom';
import { AsideBar } from '../components/dashboard/AsideBar';

export const MainLayout = () => {
  return (
    <div className="h-screen w-screen">
      <AsideBar />

      <main className="md:ml-64 dark:bg-slate-800 border-l h-screen border-slate-300 bg-slate-200 pt-2">
        <Outlet />
      </main>
    </div>
  );
};
