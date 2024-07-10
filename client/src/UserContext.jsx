import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({ user: null, setUser: () => {}, ready: false });

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null); // Initialize user state to null
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user');
                setUser(response.data); // Assuming response.data contains user info
                setReady(true);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setUser(null); // Reset user state if there's an error
                setReady(true);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {ready ? children : <p>Loading...</p>}
        </UserContext.Provider>
    );
}
