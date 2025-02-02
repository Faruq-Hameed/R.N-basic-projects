import { useAuthContext } from '../hooks/contextHooks';
const { state } = useAuthContext();

export const authToken = state.token