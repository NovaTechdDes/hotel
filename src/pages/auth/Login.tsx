import { useState } from "react"
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { ok } = await login(email, password);
        if (ok) {
            navigate('/calendario');
        };

        setLoading(false);
    };

    return (
        <div className="w-screen h-screen">
            <div className="flex flex-col items-center justify-center h-full bg-slate-200">
                <div className="bg-white rounded-lg flex flex-col items-center w-[500px] h-[600px] shadow-md pt-10 text-black px-5">
                    <h3 className="text-2xl font-bold text-center">Bienvenido a Gestion de Reservas Hotel "Mis Casitas"</h3>

                    <form className="flex flex-col gap-4 w-full mt-15 px-10" onSubmit={handleLogin}>
                        <div className="flex w-full flex-col gap-1">
                            <label className="text-sm">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                className="border w-full px-3 py-2 opacity-80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="algo@outlook.com"
                            />
                        </div>
                        <label className="flex flex-col gap-1">
                            <span className="text-sm">Contraseña</span>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="contrasena"
                                className="border px-3 py-2 rounded opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ingresa tu contraseña"
                            />
                        </label>
                        <button
                            disabled={loading}
                            type="submit"
                            className="mt-2 cursor-pointer hover:opacity-80 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                        >
                            {loading ? 'Inicinado...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                </div>
            </div>


        </div >
    )
}
