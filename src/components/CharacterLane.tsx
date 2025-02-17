import React, { useState, JSX } from 'react'
import Character from './Character'
import Draggable from './Draggable'
import Droppable from './Droppable'
import { useDroppable } from '@dnd-kit/core'

type Props = {
    characterNumber: number,
    MyArea?: boolean,
}

const CharacterLane = (props: Props) => {
    const [character, setCharacter] = useState<null | JSX.Element>(null)

    const onClickCharacterLane = () => {
        if (!character) {
            setCharacter(
                <Character
                    characterNumber={props.characterNumber}
                    myArea={props.MyArea}
                    setCharacter={setCharacter}
                />
            )
        }
    }

    const { isOver, setNodeRef } = useDroppable({
        id: props.characterNumber.toString(),
    });

    return (
        <div
            // className='CharacterLane relative w-1/5 h-full'
            onClick={onClickCharacterLane}
            ref={setNodeRef}
            className={`Droppable CharacterLane relative w-1/5 h-full ${isOver ? "" : ""}`}
        >
            <span className='absolute inset-0 flex justify-center items-center text-gray-500 text-xs z-0'>
                キャラクターレーン
            </span>
            {character && (
                <div className="absolute inset-0 flex justify-center items-center">
                    {character}
                </div>
            )}
        </div>
    )
}

export default CharacterLane
