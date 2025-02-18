import React, { JSX, useEffect, useMemo, useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'
import { useHeroContext } from '../contexts/HeroContext'
import { useCharacterContext } from '../contexts/CharacterContext'
import { resetHeroStates, updateHeroStates } from '../utils/heroStatesHandler'
import { updateCharacterStates } from '../utils/characterStatesHandler'

type Props = {
    laneNumber: number,
    className?: string,
    setHero: React.Dispatch<React.SetStateAction<JSX.Element | null>>
}
const Hero = (props: Props) => {

    const { selectedApproachState, turnPlayer } = useInputState()

    const { myCharacterStates, opponentCharacterStates } = useCharacterContext();   // new context
    // `[characters, setCharacters]` を `turnPlayer` に応じて切り替え
    const characterStates = turnPlayer === 'my' ? myCharacterStates : opponentCharacterStates;
    const [characters, setCharacters] = characterStates

    const { heroStates } = useHeroContext()  // new context
    const [heroes, setHeroes] = heroStates

    const [selectedApproach, setSelectedApproach] = selectedApproachState

    const approachedColors = characters.map((character, i) => { // laneNumberとアプローチされているNumberが一致したら出現

        if (props.laneNumber !== character.approachHero) return

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

        // characterState の approachHero を laneNumberに
        if (selectedApproach === null) return
        if (turnPlayer === 'my') {
            updateCharacterStates({ characterStates: characterStates, lane: selectedApproach, key: 'approachHero', value: props.laneNumber })
        } else {
            updateCharacterStates({ characterStates: characterStates, lane: selectedApproach - 5, key: 'approachHero', value: props.laneNumber })
        }
    }
    const selectArea =
        (selectedApproach !== null) ? ( // アプローチ選択モード
            <div
                className="z-10 w-full h-full flex justify-center items-center appearance-none bg-transparent"
                onClick={onClickApproach}
            >
                {heroes[props.laneNumber].requiredHanayomePower}
            </div>) : (
            <select
                className="z-10 w-full h-full text-center appearance-none bg-transparent"
                style={{ textAlignLast: 'center' }}  // iPhoneで中央揃え
                value={heroes[props.laneNumber].requiredHanayomePower}
                onChange={(e) => {

                    const value = Number(e.target.value)

                    if (value === -1) {
                        resetHeroStates({ heroStates: heroStates, lane: props.laneNumber }) // 10 に戻す
                        // アプローチしてるキャラのアプローチを解除
                        const newCharacters = characters.map((character, i) =>
                            character.approachHero === props.laneNumber
                                ? { ...character, approachHero: null }
                                : character
                        );
                        setCharacters(newCharacters);

                        props.setHero(null) // Hero を消去
                    } else {
                        updateHeroStates({ heroStates: heroStates, lane: props.laneNumber, key: 'requiredHanayomePower', value: value })
                    }

                }}
            >
                <option value={17}>{17}</option>
                <option value={12}>{12}</option>
                {[...Array(5)].map((_, i) => 10 - i).map((num) => (
                    <option key={num} value={num}>{num}</option>
                ))}
                <option value={-1}>-</option>
            </select>
        );

    return (
        <div className='Hero flex relative w-full h-full font-bold bg-white border-t border-b border-gray-800'>
            <div className='w-full h-full absolute flex '>
                {approachedColors}
            </div>
            {selectArea}
        </div>
    )
}

export default Hero