import { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { logout } from '../services/userAuthService';

function Logout() {
    let navigate: NavigateFunction = useNavigate();
    const { setIsLoggedIn } = useUser();

    useEffect(() => {
        function handleLogout() {
            try {
                const value = logout();
                if (value === 200) {
                    setIsLoggedIn(false);
                    navigate("/");
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        }

        handleLogout();
    }, [navigate, setIsLoggedIn]);

    return null; // Return null instead of a div to avoid rendering anything
}

export default Logout;
