import React, { useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'

const Hero = () => {

    const { selectedApproachState, isApproachState } = useInputState()
    const [selectedApproach, setSelectedApproach] = selectedApproachState
    const [isApproach, setIsApproachState] = isApproachState

    const [requiredHanayomePower, setRequiredHanayomePower] = useState(10)

    const [approachedNumber, setApproachedNumber] = useState([
        false, false, false, false, false,
    ])

    const approachedColors = approachedNumber.map((bool, i) => {
        if (!bool) return

        return (
            <div
                className='w-full h-full'
                style={{ backgroundColor: hanayomeColor[i] }}
            />
        )
    })

    const setApproachTrue = (i: number) => {    // i番目の要素をtrueに
        setIsApproachState(prevState => {
            const newState = [...prevState]; // 配列のコピーを作成
            newState[i] = true; // 指定されたインデックスを true に変更
            return newState; // 更新
        });
    };
    const setApproachToggle = (i: number) => {
        setIsApproachState(prevState => {
            const newState = [...prevState]; // 配列のコピーを作成
            newState[i] = !newState[i]; // ← これで反転（トグル）
            return newState; // 更新
        });
    };
    const selectArea = selectedApproach ? ( // アプローチ選択モード
        <div
            className="z-10 w-full h-full flex justify-center items-center appearance-none bg-transparent"
            onClick={() => {
                setSelectedApproach(null)
                setApproachToggle(selectedApproach)
            }}
        >
            {requiredHanayomePower}
        </div>) : (
        <select
            className="z-10 w-full h-full text-center appearance-none bg-transparent"
            value={requiredHanayomePower}
            onChange={(e) => setRequiredHanayomePower(Number(e.target.value))}
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
                {selectArea}
            </div>

        </div>
    )
}

export default Hero