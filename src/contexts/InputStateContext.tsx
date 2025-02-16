import React, { createContext, useContext, useEffect, useState } from "react";

type InputStateContextType = {
    selectedApproachState: [number | null, React.Dispatch<React.SetStateAction<number | null>>],
    approachStates: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
}
const InputStateContext = createContext<InputStateContextType | null>(null)

type Props = {
    children: React.ReactNode;
}

export const InputStateProvider = (props: Props) => {

    const selectedApproachState = useState<null | number>(null)

    const approachStates = useState([false, false, false, false, false,])

    const [approachingSide, setApproachingSide] = useState<null | 'my' | 'opponent'>(null);

    useEffect(() => {
        // 0-4がアプローチならを my 5-9がアプローチなら opponent
        if (selectedApproachState[0] === null) return
        if (selectedApproachState[0] < 5) {
            setApproachingSide('my')
        } else {
            setApproachingSide('opponent')
        }

        return () => {

        }
    }, [selectedApproachState[0]])


    useEffect(() => {

        console.log('selectedApproachState : ' + selectedApproachState[0]);
        console.log('approachingSide : ' + approachingSide);

        approachStates[0].forEach((isApproach, i) => {
            console.log('isApproach ' + i + ' : ' + isApproach);
        })

        return () => {
            console.clear()
        }
    }, [selectedApproachState[0], ...approachStates[0]])

    // useEffect(() => {

    //     return () => {

    //     }
    // }, [...isApproachState[0]])

    return (
        <InputStateContext.Provider value={{ selectedApproachState, approachStates, }}>
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