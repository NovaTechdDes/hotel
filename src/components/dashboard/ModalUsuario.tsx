import { useState } from "react";
import { createUser } from "../../actions/auth.actions";
import { useForm } from "../../hooks/useForm";
import type { Usuario } from "../../interface/Usuario";
import { useUsuarioStore } from "../../store/usuario.store";
import { CgClose } from "react-icons/cg";

const initialState: Usuario = {
    email: '',
    password: '',
    rol: 'empleado'
}

export const ModalUsuario = () => {

    const { closeModal } = useUsuarioStore();
    const { email, password, rol, onInputChange, onResetForm, formState } = useForm(initialState);
    const [error, setError] = useState<boolean>(false);

    const handleCancel = () => {
        onResetForm();
        closeModal();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === '') return setError(true)
        if (password === '') return setError(true);

        const res = await createUser(formState.email, formState.password, formState.rol);

        if (res) {
            onResetForm();
            closeModal();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-lg shadow-lg w-2xl h-[65vh] p-8 text-black">
                <div className="flex justify-between mb-5">
                    <h3 className="text-xl font-semibold ">Nuevo Usuario</h3>
                    <CgClose size={20} onClick={handleCancel} className="hover:bg-gray-200 cursor-pointer rounded-lg" />
                </div>

                <form action="" className="grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                        <label htmlFor="email">Email *</label>
                        <input type="email" value={email} onChange={onInputChange} className='w-full border border-gray-300 px-3 py-2 rounded-lg' placeholder='usuario@hotel.com' name="email" id="email" />
                        {error && email === '' && <p className="text-red-500">El Email es obligatorio</p>}
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="password">Contraseña *</label>
                        <input type="password" value={password} onChange={onInputChange} className='w-full border border-gray-300 px-3 py-2 rounded-lg' placeholder='********' name="password" id="password" />
                        {error && password === '' && <p className="text-red-500">La contrasea es obligatoria</p>}
                    </div>

                    <div>
                        <label htmlFor="rol">Rol</label>
                        <select className='w-full border border-gray-300 px-3 py-2 rounded-lg' name="rol" id="rol" value={rol} onChange={onInputChange}>
                            <option value="admin">Administrador</option>
                            <option value="empleado">Empleado</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-5 col-span-2 mt-10">
                        <button type="button" onClick={handleCancel} className="border px-2 py-2 cursor-pointer hover:opacity-70 rounded-lg border-gray-300">Cancelar</button>
                        <button type="submit" onClick={handleSubmit} className="border px-2 py-2 cursor-pointer hover:opacity-70 rounded-lg bg-blue-800 text-white">Crear Usuario</button>
                    </div>
                </form >
            </div>
        </div>
    )
}
