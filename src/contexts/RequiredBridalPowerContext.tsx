// src/contexts/RequiredBridalPowerContext .tsx

import React, { createContext, useContext, useMemo, useState, } from 'react'

type RequiredBridalPowerContextState = {
    requiredBridalPower1: [number, React.Dispatch<React.SetStateAction<number>>];
    requiredBridalPower2: [number, React.Dispatch<React.SetStateAction<number>>];
    requiredBridalPower3: [number, React.Dispatch<React.SetStateAction<number>>];
    requiredBridalPower4: [number, React.Dispatch<React.SetStateAction<number>>];
    requiredBridalPower5: [number, React.Dispatch<React.SetStateAction<number>>];
};

const RequiredBridalPowerContext = createContext<RequiredBridalPowerContextState | null>(null);

type Props = {
    children: React.ReactNode;
}
export const RequiredBridalPowerProvider: React.FC<Props> = ({ children }) => {

    const requiredBridalPower1 = useState(10)
    const requiredBridalPower2 = useState(10)
    const requiredBridalPower3 = useState(10)
    const requiredBridalPower4 = useState(10)
    const requiredBridalPower5 = useState(10)

    return (
        <RequiredBridalPowerContext.Provider value={{
            requiredBridalPower1,
            requiredBridalPower2,
            requiredBridalPower3,
            requiredBridalPower4,
            requiredBridalPower5,
        }}>
            {children}
        </RequiredBridalPowerContext.Provider>
    )
}


export const useRequiredBridalPower = (): RequiredBridalPowerContextState  => {
    const context = useContext(RequiredBridalPowerContext);
    if (context === null) {
        throw new Error('RequiredBridalPowerContext  Error');
    }
    return context;
};