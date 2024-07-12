import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        console.log("Inside useEffect"); 
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8000/user/', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(({ data }) => {
                setUser(data);
                setReady(true);
            })
            .catch(err => {
                console.error("Error fetching profile:", err);
            });
        } else {
            console.error("No token found");
        }
    }, []); 

    console.log("User state:", user); 

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
