import React, { createContext, useContext, useEffect, useState } from "react";

type InputStateContextType = {
    isSelectApproachState: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>]
    isApproachState: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>]
}
const InputStateContext = createContext<InputStateContextType | null>(null)

type Props = {
    children: React.ReactNode;
}

export const InputStateProvider = (props: Props) => {

    // const [isSelectApproach, setIsSelectApproach] = useState([false, false, false, false, false,])
    const isSelectApproachState = useState([false, false, false, false, false, false, false, false, false, false,])
    // const [isApproach, setApproach] = useState([false, false, false, false, false,])
    const isApproachState = useState([false, false, false, false, false, false, false, false, false, false,])


    useEffect(() => {

        isSelectApproachState[0].forEach((isSelectApproach, i) => {
            console.log('isSelectApproach ' + i + ' : ' + isSelectApproach);
        })
        isApproachState[0].forEach((isApproach, i) => {
            console.log('isApproach ' + i + ' : ' + isApproach);
        })

        return () => {
            console.clear()
        }
    }, [...isSelectApproachState[0], ...isApproachState[0]])


    return (
        <InputStateContext.Provider value={{ isSelectApproachState, isApproachState }}>
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