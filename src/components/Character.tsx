import React, { JSX, useEffect, useMemo, useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'
import toggleBooleanAtIndex from '../utils/toggleBooleanAtIndex'
import { useRequiredHanayomePower } from '../contexts/RequiredHanayomePowerContext'

type Props = {
    characterNumber: number
    classname?: string,
    myArea?: boolean
    setCharacter: React.Dispatch<React.SetStateAction<JSX.Element | null>>
}
const Character = (props: Props) => {

    const laneNumber = useMemo(() =>    // characterNumber -> [0-4]
        props.myArea ? props.characterNumber : props.characterNumber - 5,
        [props.characterNumber, props.myArea]
    );

    const { selectedApproachState, selectHeroState, myApproachStates, opponentApproachStates, approachedByStates, turnPlayer } = useInputState()
    const { requiredHanayomePower, setRequiredHanayomePower } = useRequiredHanayomePower()

    const [selectedApproach, setSelectedApproach] = selectedApproachState
    const [selectedHero, setSelectedHero] = selectHeroState

    const [approachedBy, setApproachedBy] = approachedByStates

    const [approachStates, setApproachStates] = props.myArea ? myApproachStates : opponentApproachStates    // [ bool, bool, bool, bool, bool, ]

    const [isSelectApproach, setIsSelectApproach] = useState(false) // このコンポーネントがアプローチ選択中か
    useEffect(() => {
        if (selectedApproach === props.characterNumber) {
            setIsSelectApproach(true);
        } else {
            setIsSelectApproach(false);
        }
    }, [selectedApproach]);

    const [isApproach, setIsApproach] = useState(false) // このコンポーネントがアプローチ中か
    useEffect(() => {
        if (approachStates[laneNumber]) {
            setIsApproach(true)
        } else {
            setIsApproach(false)
        }
    }, [...approachStates])

    const [hanayomePower, setHanayomePower] = useState(0)
    const [addHanayomePower, setAddHanayomePower] = useState(0)
    const [totalHanayomePower, setTotalHanayomePower] = useState(0)
    useEffect(() => {
        if (!isApproach) {
            setTotalHanayomePower(hanayomePower + addHanayomePower)
        } else {
            if (selectedHero[laneNumber] !== null) {
                setTotalHanayomePower(hanayomePower + addHanayomePower)
                setTotalHanayomePower(hanayomePower + addHanayomePower - requiredHanayomePower[selectedHero[laneNumber]])
            }
        }
        return () => {
            setTotalHanayomePower(0)
        }
    }, [hanayomePower, addHanayomePower, isApproach, ...requiredHanayomePower])

    const onClickTotal = () => {
        if (!isSelectApproach && !isApproach) { // 現在アプローチ選択中ではない && アプローチ中ではない
            setSelectedApproach(props.characterNumber)  // キャラクターをアプローチ選択中にする
        } else {
            setSelectedApproach(null)   // アプローチ選択中を null

            const newApproachedBy = () => {
                return approachedBy.map(arr => {
                    const newArr = [...arr]; // 内部配列をコピー
                    newArr[laneNumber] = false; // laneNumber 番目を false にする
                    return newArr;
                });
            };

            setApproachedBy(newApproachedBy());

            const newSelectedHero = [...selectedHero]
            newSelectedHero[laneNumber] = null
            setSelectedHero(newSelectedHero)
        }

        if (approachStates[laneNumber]) {
            toggleBooleanAtIndex(laneNumber, setApproachStates) // approachStates の laneNumber のアプローチ中を反転
        }
    }

    return (
        <div className='Character w-full h-full bg-white font-bold'>
            <select
                className='w-full h-1/3 text-center appearance-none'
                value={hanayomePower}
                onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value === -1) {
                        if ((turnPlayer === 'my' && props.myArea) || (turnPlayer === 'opponent' && !props.myArea)) {
                            setSelectedApproach(null)
                            setApproachStates([false, false, false, false, false,])
                            setApproachedBy([
                                [false, false, false, false, false,],
                                [false, false, false, false, false,],
                                [false, false, false, false, false,],
                                [false, false, false, false, false,],
                                [false, false, false, false, false,],
                            ])
                        }
                        props.setCharacter(null)
                    }
                    setHanayomePower(value)
                }}
            >
                <option value={-1}>-</option>
                {[...Array(51)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                ))}
            </select>
            <div className='h-1/3 flex  items-center back-slate-400'>
                <button
                    className='w-1/4 h-full bg-gray-700 text-white rounded-r-lg'
                    onClick={() => { setAddHanayomePower((prev) => Math.max(0, prev - 1)) }}
                >-</button >
                <div className='flex-1 w-full h-full flex justify-center items-center'>
                    <div
                        className=' flex justify-center items-center text-base w-1/2 h-4/5 '
                        onClick={() => { setAddHanayomePower(0) }}
                    >
                        {addHanayomePower}
                        {/* {laneNumber} */}
                    </div>
                </div>
                <button
                    className='w-1/4 h-full bg-gray-700 text-white rounded-l-lg'
                    onClick={() => setAddHanayomePower((prev) => prev + 1)}
                >+</button>
            </div>
            <div
                className={`
                    h-1/3 flex justify-center items-center back-slate-500 
                    `}
                style={{    // レーン番号によって approachStates のカラーを変更
                    backgroundColor: (isSelectApproach || isApproach) ? hanayomeColor[laneNumber] : ''
                }}
                onClick={onClickTotal}
            >
                {totalHanayomePower}
                {/* {props.characterNumber} */}
            </div>
        </div>
    )
}

export default Character