import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null); // Initialize user state to null
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user');
                setUser(response.data); 
                setReady(true);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setUser(null); 
                setReady(true);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {ready ? children : <p>Loading...</p>}
        </UserContext.Provider>
    );
}
