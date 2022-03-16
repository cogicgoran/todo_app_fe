import { useUserContext } from "../context/current-user/CurentUserContext";
import axios from "axios";

export function useLogout() {
    const { setCurrentUser } = useUserContext();
    async function handleLogout() {
        const response = await axios.post('/api/users/logout')
        if (response.status === 200) {
            setCurrentUser(null);
        } else {
            alert(`coult not logout\n${JSON.stringify(response, null, 2)}`)
        }
    }
    return { handleLogout, setCurrentUser };
}