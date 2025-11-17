import { useQuery } from "@tanstack/react-query"
import { getRolUser } from "../../actions/auth.actions"

export const useRolAuth = () => {
    return useQuery({
        queryKey: ['users', 'rol'],
        queryFn: getRolUser,
        staleTime: 1000 * 60 * 60
    });
};