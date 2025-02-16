import React, { createContext, useContext, useEffect, useState } from "react";

type InputStateContextType = {
    /**
     * アプローチ選択中のキャラ [null, 0-9]
     */
    selectedApproachState: [number | null, React.Dispatch<React.SetStateAction<number | null>>],
    /**
     * アプローチしている主人公
     */
    selectHeroState: [(number | null)[], React.Dispatch<React.SetStateAction<(number | null)[]>>]
    /**
     * 自分のキャラがアプローチ中か [bool, bool, bool, bool, bool,]
     */
    myApproachStates: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
    /**
     * 相手のキャラがアプローチ中か [bool, bool, bool, bool, bool,]
     */
    opponentApproachStates: [boolean[], React.Dispatch<React.SetStateAction<boolean[]>>],
    // heroApproachStates: boolean[],
    // setHeroApproachStates: React.Dispatch<React.SetStateAction<boolean[]>>
    approachedByStates: [boolean[][], React.Dispatch<React.SetStateAction<boolean[][]>>]
    /**
     * ターンプレイヤー my | opponent
     */
    turnPlayer: string
}
const InputStateContext = createContext<InputStateContextType | null>(null)

type Props = {
    children: React.ReactNode;
}

export const InputStateProvider = (props: Props) => {

    const selectedApproachState = useState<null | number>(null)
    const selectHeroState = useState<(null | number)[]>([null, null, null, null, null,])

    const myApproachStates = useState([false, false, false, false, false,])
    const opponentApproachStates = useState([false, false, false, false, false,])

    const [turnPlayer, setTurnPlayer] = useState<'my' | 'opponent'>('my');

    useEffect(() => {
        // 0-4がアプローチならを my 5-9がアプローチなら opponent
        if (selectedApproachState[0] === null) return
        if (selectedApproachState[0] < 5) {
            setTurnPlayer('my')
            // setHeroApproachStates(myApproachStates[0])
            opponentApproachStates[1]([false, false, false, false, false,])
        } else {
            setTurnPlayer('opponent')
            // setHeroApproachStates(opponentApproachStates[0])
            myApproachStates[1]([false, false, false, false, false,])
        }
    }, [selectedApproachState[0]])

    const approachedByStates = useState([
        [false, false, false, false, false,],
        [false, false, false, false, false,],
        [false, false, false, false, false,],
        [false, false, false, false, false,],
        [false, false, false, false, false,],
    ])
    useEffect(() => {

        approachedByStates[1]([
            [false, false, false, false, false,],
            [false, false, false, false, false,],
            [false, false, false, false, false,],
            [false, false, false, false, false,],
            [false, false, false, false, false,],
        ])

        selectHeroState[1]([null, null, null, null, null,])

    }, [turnPlayer])



    useEffect(() => {

        // console.log('selectedApproachState : ' + selectedApproachState[0]);
        // console.log('turnPlayer : ' + turnPlayer);

        // myApproachStates[0].forEach((isApproach, i) => {
        //     console.log('myApproach ' + i + ' : ' + isApproach);
        // })
        // opponentApproachStates[0].forEach((isApproach, i) => {
        //     console.log('opponentApproach ' + i + ' : ' + isApproach);
        // })
        // approachedByStates[0].forEach((isApproach, i) => {
        //     console.log('approachedLane ' + i + ' : ' + isApproach);
        // })

        // console.log(selectHeroState[0]);

        return () => {
            // console.clear()
        }
    }, [selectedApproachState[0], ...myApproachStates[0], ...opponentApproachStates[0], ...[...approachedByStates[0]], ...selectHeroState[0]])

    return (
        <InputStateContext.Provider value={{ selectedApproachState, selectHeroState, myApproachStates, opponentApproachStates, approachedByStates, turnPlayer }}>
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