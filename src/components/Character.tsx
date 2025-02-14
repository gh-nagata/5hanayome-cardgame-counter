import React, { useEffect, useMemo, useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'

type Props = {
    characterNumber: number
    classname?: string,
    MyArea?: boolean
}
const Character = (props: Props) => {

    const LaneNumber = useMemo(() =>    // characterNumber -> [0-4]
        props.MyArea ? props.characterNumber : props.characterNumber - 5,
        [props.characterNumber, props.MyArea]
    );

    const { selectedApproachState, isApproachState } = useInputState()

    const [selectedApproach, setSelectedApproach] = selectedApproachState
    const [isSelectApproach, setIsSelectApproach] = useState(false)
    useEffect(() => {

        if (selectedApproach === props.characterNumber) {
            setIsSelectApproach(true)
        } else {
            setIsSelectApproach(false)
        }

        return () => {

        }
    }, [selectedApproach])

    const [isApproach, setIsApproachState] = isApproachState

    const [hanayomePower, setHanayomePower] = useState(0)
    const [addHanayomePower, setAddHanayomePower] = useState(0)

    const [totalHanayomePower, setTotalHanayomePower] = useState(0)
    useEffect(() => {

        setTotalHanayomePower(hanayomePower + addHanayomePower)

        return () => {
            setTotalHanayomePower(0)
        }
    }, [hanayomePower, addHanayomePower])

    const onClickTotal = () => {
        if (selectedApproach !== props.characterNumber && !isApproach[props.characterNumber]) {
            setSelectedApproach(props.characterNumber)
        } else {
            setSelectedApproach(null)
        }

        if (isApproach[props.characterNumber]) {
            // const setApproachFalse = (i: number) => {    // i番目の要素をtrueに
            //     setIsApproachState(prevState => {
            //         const newState = [...prevState]; // 配列のコピーを作成
            //         newState[i] = false; // 指定されたインデックスを false に変更
            //         return newState; // 更新
            //     });
            // };
            // setApproachFalse(props.characterNumber)

            const setApproachToggle = (i: number) => {
                setIsApproachState(prevState => {
                    const newState = [...prevState]; // 配列のコピーを作成
                    newState[i] = !newState[i]; // ← これで反転（トグル）
                    return newState; // 更新
                });
            };
            setApproachToggle(props.characterNumber)

        }
    }

    return (
        <div className='Character w-full h-full bg-white font-bold'>
            <select
                className='w-full h-1/3 text-center appearance-none'
                value={hanayomePower}
                onChange={(e) => setHanayomePower(Number(e.target.value))}
            >
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
                style={{    // レーン番号によって isApproach のカラーを変更
                    backgroundColor: (isSelectApproach || isApproach[props.characterNumber]) ? hanayomeColor[LaneNumber] : ''
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