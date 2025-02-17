import React, { createContext, useContext, useEffect, useState } from 'react';
import { CharacterStateType, defaultCharacterState } from '../types/characterStateType'
import { useInputState } from './InputStateContext';

type CharacterContextType = {
    myCharacterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>],
    opponentCharacterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>],
};
const CharacterContext = createContext<CharacterContextType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const CharacterProvider = (props: Props) => {

    const { turnPlayer } = useInputState()

    const initialCharacterStates = (): CharacterStateType[] => Array(5).fill(defaultCharacterState);

    const myCharacterStates = useState<CharacterStateType[]>(initialCharacterStates())
    // デバッグ
    // const myCharacterStates = useState<CharacterStateType[]>([
    //     { hanayomePower: 10, addHanayomePower: 0, approachHero: 0, },
    //     { hanayomePower: 10, addHanayomePower: 0, approachHero: 0, },
    //     { hanayomePower: 10, addHanayomePower: 0, approachHero: 3, },
    //     { hanayomePower: 10, addHanayomePower: 0, approachHero: null, },
    //     { hanayomePower: 10, addHanayomePower: 0, approachHero: null, },
    // ])

    const opponentCharacterStates = useState<CharacterStateType[]>(initialCharacterStates())

    useEffect(() => {

        if (turnPlayer === 'my') {
            // opponentCharacterStates の approachHero を null
            opponentCharacterStates[1](prevStates =>
                prevStates.map(state => ({ ...state, approachHero: null }))
            );
        } else {
            // myCharacterStates の approachHero を null
            myCharacterStates[1](prevStates =>
                prevStates.map(state => ({ ...state, approachHero: null }))
            );
        }

    }, [turnPlayer]);


    useEffect(() => {

        myCharacterStates[0].forEach((character, i) => {
            console.log(
                i + ': power:' + character.hanayomePower + ' addPower:' + character.addHanayomePower + ' isSelect:' + ' approach:' + character.approachHero
            )
        })
        opponentCharacterStates[0].forEach((character, i) => {
            console.log(
                i + ': power:' + character.hanayomePower + ' addPower:' + character.addHanayomePower + ' isSelect:' + ' approach:' + character.approachHero
            )
        })

        return () => {
            console.clear()
        }
    }, [...myCharacterStates[0], ...opponentCharacterStates[0]])


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