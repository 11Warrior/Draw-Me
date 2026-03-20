"use client"
import  { createContext, ReactNode, useState } from 'react'
import { GlobalContextType } from '../types/drawme.types';


export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [panelState, setPanelState] = useState(false);

    return (
        <GlobalContext.Provider value={{ panelState, setPanelState }}>
            {children}
        </GlobalContext.Provider>
    )
}

