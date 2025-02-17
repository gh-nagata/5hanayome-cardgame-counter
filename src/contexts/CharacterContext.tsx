import React, { createContext, JSX, useContext, useState } from 'react';
import { CharacterStateType, defaultCharacterState } from '../types/characterStateType'

type CharacterContextType = {
    myCharacterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>],
    opponentCharacterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>],
};
const CharacterContext = createContext<CharacterContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const CharacterProvider = (props: Props) => {

    const initialCharacterStates = (): CharacterStateType[] => Array(5).fill(defaultCharacterState);

    const myCharacterStates = useState<CharacterStateType[]>(initialCharacterStates())

    const opponentCharacterStates = useState<CharacterStateType[]>(initialCharacterStates())

    return (
        <CharacterContext.Provider value={{ myCharacterStates, opponentCharacterStates }}>
            {props.children}
        </CharacterContext.Provider>
    );
};

export const useCharacterContext = (): CharacterContextType => {
    const context = useContext(CharacterContext);
    if (context === null) {
        throw new Error('CharacterContext must be used within a CharacterProvider');
    }
    return context;
};