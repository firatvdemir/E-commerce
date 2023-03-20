import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logout() {
    const {isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect( () => {
        setIsLoggedIn({
            ...isLoggedIn,
            'status': false,
            'username': 'unknown',
        });
        navigate(`/`);
    })
};

export default Logout;