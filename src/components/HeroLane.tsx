import React, { JSX, useState } from 'react'
import Hero from './Hero'

type Props = {
    laneNumber: number,
    className?: string,
}
const HeroLane = (props: Props) => {

    const [hero, setHero] = useState<null | JSX.Element>(<Hero laneNumber={props.laneNumber} />)

    return (
        <div
            className='HeroLane relative bg-green-100 w-1/5 h-full'
        >
            <span className='absolute inset-0 flex justify-center items-center text-gray-500 text-base z-0'>
                主人公レーン
            </span>
            {hero && (
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    {hero}
                </div>
            )}
        </div>
    )
}

export default HeroLane