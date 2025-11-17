import { Outlet } from "react-router-dom"
import { AsideBar } from "../components/dashboard/AsideBar"
import Header from "../components/dashboard/Header"

export const MainLayout = () => {
    return (
        <div className="grid grid-cols-5 h-screen w-screen">
            <AsideBar />

            <div className="col-span-4 border-l border-slate-300 bg-slate-200">
                <Header />

                <Outlet />
            </div>
        </div>
    )
}
