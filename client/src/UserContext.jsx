import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user , setUser] = useState('');
    const [ready , setReady] = useState(false)

    return(
        <UserContext.Provider value={{ user, setUser , ready}}>
            {children}
        </UserContext.Provider>
    )
}