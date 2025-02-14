import React, { JSX, useMemo, useState } from 'react'
import Character from './Character'

type Props = {
    characterNumber: number,
    MyArea?: boolean,
}
const CharacterLane = (props: Props) => {

    // const characterNumber = useMemo(() =>
    //     props.MyArea ? props.characterNumber : props.characterNumber - 5,
    //     [props.characterNumber, props.MyArea]
    // );

    const [character, setCharacter] = useState<null | JSX.Element>(null)

    return (
        <div
            className='CharacterLane relative bg-green-200 w-1/5 h-full'
            onClick={() => { setCharacter(<Character characterNumber={props.characterNumber} MyArea={props.MyArea} />) }}
        >
            <span className='absolute inset-0 flex justify-center items-center text-gray-500 text-base z-0'>
                キャラクターレーン
            </span>
            {character && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    {character}
                </div>
            )}
        </div>
    )
}

export default CharacterLane