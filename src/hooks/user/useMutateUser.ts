import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../actions/users.actions';
import type { Usuario } from '../../interface';

export const useMutateUser = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationFn: (usuario: Usuario) => createUser(usuario.email, usuario.password, usuario.rol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    createUserMutation,
  };
};
