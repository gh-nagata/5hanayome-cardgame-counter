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
        <div className={`${props.classname}`}>
            <div className='CharacterLanes flex h-2/5 bg-pink-200'>
                {OpponentCharacterLanes}
            </div>
            <div className='HeroLanes flex h-1/5 bg-pink-100'>
                {HeroLanes}
            </div>
            <div className='CharacterLanes flex h-2/5 bg-pink-200'>
                {MyCharacterLanes}
            </div>
        </div>
    )
}

export default PlayArea