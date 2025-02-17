import React, { JSX, useEffect, useMemo, useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'
import Draggable from './Draggable'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useCharacterContext } from '../contexts/CharacterContext'
import { useHeroContext } from '../contexts/HeroContext'
import { resetCharacterStates, updateCharacterStates } from '../utils/characterStatesHandler'

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

    const { selectedApproachState, turnPlayer } = useInputState()
    // const { requiredHanayomePower, setRequiredHanayomePower } = useRequiredHanayomePower()

    const { myCharacterStates, opponentCharacterStates } = useCharacterContext()    // new context
    const { heroStates } = useHeroContext()  // new context
    const [heroes, setHeroes] = heroStates

    // `[characters, setCharacters]` を `turnPlayer` に応じて切り替え
    const characterStates = props.myArea ? myCharacterStates : opponentCharacterStates;
    const [characters, setCharacters] = characterStates


    const [selectedApproach, setSelectedApproach] = selectedApproachState

    const [totalHanayomePower, setTotalHanayomePower] = useState(0)
    useEffect(() => {
        if (characters[laneNumber].approachHero === null) {
            setTotalHanayomePower(characters[laneNumber].hanayomePower + characters[laneNumber].addHanayomePower)
        } else {
            setTotalHanayomePower(
                characters[laneNumber].hanayomePower + characters[laneNumber].addHanayomePower - heroes[characters[laneNumber].approachHero].requiredHanayomePower
            )
        }
        return () => {
            setTotalHanayomePower(0)
        }
    }, [characters[laneNumber].hanayomePower, characters[laneNumber].addHanayomePower, characters[laneNumber].approachHero, heroes])  // heroes は怪しい

    const onClickTotal = () => {
        // setSelectedApproach(props.characterNumber)
        if ((selectedApproach === null) || (selectedApproach !== props.characterNumber)) { // 現在アプローチ選択中ではない ||  違うとこを選択
            setSelectedApproach(props.characterNumber)
        } else if (characters[laneNumber].approachHero !== null) {
            setSelectedApproach(null)   // アプローチ選択中を null
            updateCharacterStates({ characterStates: characterStates, lane: laneNumber, key: 'approachHero', value: null })
        } else {
            setSelectedApproach(null)   // アプローチ選択中を null
        }
    }

    /**
     * attributes：Draggableアイテムに適した一連のデフォルト属性を提供してくれる
     * listeners：ドラッグ操作のイベントリスナーを含むため、操作したいコンポーネントに登録する
     */
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.characterNumber.toString(),
    });
    /**
     * Draggableアイテムが選択されると、画面上でアイテムを移動するために必要な座標が設定される
     */
    const style = {
        transform: CSS.Translate.toString(transform),
    }

    return (
        // <div className='Character flex flex-col w-full h-full bg-white font-bold'>
        // <Draggable id={'character'}>
        <div
            className={`Character flex  w-full h-full bg-white font-bold ${props.myArea ? 'flex-col-reverse' : 'flex-col'}`}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
        >

            <div className={`
            wide:h-1/3 flex items-center 
             tall:flex-1 tall:max-h-36
            ${props.myArea ? 'tall:flex-col-reverse' : 'tall:flex-col'}
            `}>
                <button
                    className={`
                    w-1/4 h-full bg-blue-500 text-white
                    ${props.myArea ? 'wide:rounded-tr-lg ' : 'wide:rounded-br-lg '}
                    tall:w-full tall:h-1/3
                    `}
                    onClick={() =>
                        updateCharacterStates({
                            characterStates: characterStates,
                            lane: laneNumber, // 変更したいキャラクターのインデックス
                            key: "addHanayomePower",
                            value: characters[laneNumber].addHanayomePower - 1,
                        })
                    }

                >-</button >
                <div className='flex-1 w-full h-full flex justify-center items-center tall:h-1/3'>
                    <div
                        className=' flex justify-center items-center text-base w-1/2 h-4/5 '
                        onClick={() =>
                            updateCharacterStates({
                                characterStates: characterStates,
                                lane: laneNumber,
                                key: "addHanayomePower",
                                value: 0,
                            })
                        }
                    >
                        {characters[laneNumber].addHanayomePower}
                    </div>
                </div>
                <button
                    className={`
                        w-1/4 h-full bg-red-500 text-white
                        ${props.myArea ? 'wide:rounded-tl-lg ' : 'wide:rounded-bl-lg'}
                        tall:w-full tall:h-1/3
                        `}
                    onClick={() =>
                        updateCharacterStates({
                            characterStates: characterStates,
                            lane: laneNumber,
                            key: "addHanayomePower",
                            value: characters[laneNumber].addHanayomePower + 1,
                        })
                    }
                >+</button>
            </div>
            <select
                className='
                w-full bg-slate-100 text-center appearance-none
                wide:h-1/3 
                tall:h-12
                '
                style={{ textAlignLast: 'center' }}  // iPhoneで中央揃え
                value={characters[laneNumber].hanayomePower}
                onChange={(e) => {
                    const value = Number(e.target.value)
                    if (value === -1) {
                        if ((turnPlayer === 'my' && props.myArea) || (turnPlayer === 'opponent' && !props.myArea)) {
                            setSelectedApproach(null)   // 選択を解除
                            updateCharacterStates({ characterStates: characterStates, lane: laneNumber, key: 'approachHero', value: null }) // アプローチを解除
                            resetCharacterStates({ characterStates: characterStates, lane: laneNumber })    // デフォルト値にリセット
                        }
                        props.setCharacter(null)
                    } else {
                        updateCharacterStates({
                            characterStates: characterStates,
                            lane: laneNumber,
                            key: "hanayomePower",
                            value: value,
                        })
                    }
                }}
            >
                <option value={-1}>-</option>
                {[...Array(100)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                ))}
            </select>
            <div
                className={`
                    h-1/3 flex justify-center items-center back-slate-500 
                    tall:h-12
                    `}
                style={{    // レーン番号によって approachStates のカラーを変更
                    backgroundColor: ((selectedApproach === props.characterNumber) || (characters[laneNumber].approachHero !== null)) ? hanayomeColor[laneNumber] : ''
                }}
                onClick={onClickTotal}
            >
                {totalHanayomePower}
            </div>
        </div>
        //  </Draggable > 
    )
}

export default Character