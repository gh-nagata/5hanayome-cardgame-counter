import React, { useEffect, useMemo, useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'
import toggleBooleanAtIndex from '../utils/toggleBooleanAtIndex'
import { useRequiredHanayomePower } from '../contexts/RequiredHanayomePowerContext'

type Props = {
    laneNumber: number,
    className?: string,
}
const Hero = (props: Props) => {

    const { selectedApproachState, selectHeroState, myApproachStates, opponentApproachStates, approachedByStates, turnPlayer } = useInputState()
    const { requiredHanayomePower, setRequiredHanayomePower } = useRequiredHanayomePower()

    const [selectedApproach, setSelectedApproach] = selectedApproachState
    const [myApproach, setMyApproach] = myApproachStates
    const [opponentApproach, setOpponentApproach] = opponentApproachStates

    const [selectHero, setSelectHero] = selectHeroState


    const [approachStates, setApproachStates] = (turnPlayer === 'my') ? myApproachStates : opponentApproachStates    // [ bool, bool, bool, bool, bool, ]
    // const [approachStates, setApproachStates] = useMemo(() => {
    //     if (turnPlayer === 'my') {
    //         return myApproachStates
    //     } else {
    //         return opponentApproachStates
    //     }
    // }, [turnPlayer])

    const [approachedBy, setApproachedBy] = approachedByStates
    const whoApproachFunction = (selectedApproachState: null | number) => {
        if (selectedApproachState === null) return
        const whoApproach = selectedApproachState < 5 ? selectedApproachState : selectedApproachState - 5

        // const newApproachedBy = () => {
        //     const newArray = [...approachedBy]
        //     newArray[props.laneNumber][whoApproach] = true
        //     return newArray
        // }
        const newApproachedBy = () => {
            return approachedBy.map((arr, index) => {
                if (index !== props.laneNumber) return arr; // 変更しない行はそのまま返す

                const newArr = [...arr]; // 内部配列もコピー
                newArr[whoApproach] = true; // whoApproach 番目を true にする
                return newArr;
            });
        };
        setApproachedBy(newApproachedBy())
    }

    const approachedColors = approachedBy[props.laneNumber].map((bool, i) => {
        if (!bool) return
        return (
            <div
                key={i}
                className='h-full flex-1'
                style={{ backgroundColor: hanayomeColor[i] }}
            />
        )
    })

    const onClickApproach = () => {
        setSelectedApproach(null)

        // approachingSide が my なら myApproachStatesを反転  opponent なら opponentApproachStatesを反転
        if (selectedApproach === null) return
        if (turnPlayer === 'my') {
            toggleBooleanAtIndex(selectedApproach, setApproachStates)
        } else if (turnPlayer === 'opponent') {
            toggleBooleanAtIndex(selectedApproach - 5, setApproachStates)
        }

        if (turnPlayer === 'my') {
            const newSelectHero = [...selectHero]
            newSelectHero[selectedApproach] = props.laneNumber
            setSelectHero(newSelectHero)
        } else if (turnPlayer === 'opponent') {
            const newSelectHero = [...selectHero]
            newSelectHero[selectedApproach - 5] = props.laneNumber
            setSelectHero(newSelectHero)
        }

        whoApproachFunction(selectedApproach)

        const whoApproach = selectedApproach < 5 ? selectedApproach : selectedApproach - 5
        const newApproachedBy = () => {
            return approachedBy.map((arr, index) => {
                if (index !== props.laneNumber) return arr; // 変更しない行はそのまま返す

                const newArr = [...arr]; // 内部配列もコピー
                newArr[whoApproach] = true; // whoApproach 番目を true にする
                return newArr;
            });
        };
        setApproachedBy(newApproachedBy())
    }
    const selectArea =
        // selectedApproach ? ( // アプローチ選択モード
        (selectedApproach !== null) ? ( // アプローチ選択モード
            <div
                className="z-10 w-full h-full flex justify-center items-center appearance-none bg-transparent"
                onClick={onClickApproach}
            >
                {requiredHanayomePower[props.laneNumber]}
            </div>) : (
            <select
                className="z-10 w-full h-full text-center appearance-none bg-transparent"
                value={requiredHanayomePower[props.laneNumber]}
                onChange={(e) => {
                    // setRequiredHanayomePower(Number(e.target.value))
                    const newRequiredHanayomePower = [...requiredHanayomePower]
                    newRequiredHanayomePower[props.laneNumber] = Number(e.target.value)
                    setRequiredHanayomePower(newRequiredHanayomePower)
                }}
            >
                {[...Array(5)].map((_, i) => (
                    <option key={i} value={i + 6}>{i + 6}</option>
                ))}
                <option value={12}>{12}</option>
                <option value={17}>{17}</option>
            </select>
        );

    return (
        <div className='Hero flex relative w-full h-full font-bold'>
            <div className='w-full h-full absolute flex bg-white'>
                {approachedColors}
            </div>
            {selectArea}
        </div>
    )
}

export default Hero