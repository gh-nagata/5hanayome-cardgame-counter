import React, { createContext, useContext, useEffect, useState } from "react";

type InputStateContextType = {
    selectedApproachState: [number | null, React.Dispatch<React.SetStateAction<number | null>>],
    isApproachState: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
}
const InputStateContext = createContext<InputStateContextType | null>(null)

type Props = {
    children: React.ReactNode;
}

export const InputStateProvider = (props: Props) => {

    const selectedApproachState = useState<null | number>(null)
    const isApproachState = useState([false, false, false, false, false, false, false, false, false, false,])


    useEffect(() => {

        console.log('selectedApproachState ' + ' : ' + selectedApproachState[0]);

        isApproachState[0].forEach((isApproach, i) => {
            console.log('isApproach ' + i + ' : ' + isApproach);
        })

        return () => {
            console.clear()
        }
    }, [selectedApproachState[0], ...isApproachState[0]])


    return (
        <InputStateContext.Provider value={{ selectedApproachState, isApproachState, }}>
            {props.children}
        </InputStateContext.Provider>
    )
}

export const useInputState = (): InputStateContextType => {
    const context = useContext(InputStateContext);
    if (!context) {
        throw new Error('InputStateContext Error');
    }
    return context;
};