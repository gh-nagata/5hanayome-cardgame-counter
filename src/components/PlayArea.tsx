import React from 'react'
import Character from './Character'
import CharacterLane from './CharacterLane'
import HeroLane from './HeroLane'


type Props = {
    classname?: string
}
const PlayArea = (props: Props) => {

    const OpponentCharacterLanes = [...Array(5)].map((_, i) => (
        <CharacterLane key={i} characterNumber={i + 5} />
    ))
    const MyCharacterLanes = [...Array(5)].map((_, i) => (
        <CharacterLane key={i} characterNumber={i} MyArea={true} />
    ))
    const HeroLanes = [...Array(5)].map((_, i) => (
        <HeroLane key={i} laneNumber={i} />
    ))

    return (
        <div className={`${props.classname} flex flex-col justify-center`}>
            <div className='CharacterLanes flex flex-1  tall:max-h-60 bg-gray-600'>
                {OpponentCharacterLanes}
            </div>
            <div className='HeroLanes flex min-h-12 h-1/6 max-h-20 bg-gray-600'>
                {HeroLanes}
            </div>
            <div className='CharacterLanes flex flex-1  tall:max-h-60 bg-gray-600'>
                {MyCharacterLanes}
            </div>
        </div>
    )
}

export default PlayArea