import React, { createContext, useContext, useState } from 'react';
import { defaultHeroState, heroStateType } from '../types/heroStateType';

type HeroContextType = {
    heroStates: [heroStateType[], React.Dispatch<React.SetStateAction<heroStateType[]>>]
};

const HeroContext = createContext<HeroContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const HeroProvider = (props: Props) => {

    // const initialHeroStates = (): heroStateType[] => Array(5).fill(defaultHeroState);

    const heroStates = useState<heroStateType[]>(Array(5).fill(defaultHeroState))

    return (
        <HeroContext.Provider value={{ heroStates }}>
            {props.children}
        </HeroContext.Provider>
    );
};

export const useHeroContext = (): HeroContextType => {
    const context = useContext(HeroContext);
    if (context === null) {
        throw new Error('HeroContext must be used within a HeroContextProvider');
    }
    return context;
};