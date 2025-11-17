
import { MdErrorOutline } from 'react-icons/md'

export const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-md">
                <span className="text-6xl text-blue-500 mb-4">
                    <MdErrorOutline />
                </span>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                <h2 className="text-xl text-gray-600 mb-4">La página que buscas no existe</h2>
                <a
                    href="/"
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Volver al inicio
                </a>
            </div>
        </div>
    )
}
