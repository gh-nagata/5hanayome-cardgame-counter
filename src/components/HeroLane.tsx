import React, { JSX, useEffect, useState } from 'react'
import Hero from './Hero'

type Props = {
    laneNumber: number,
    className?: string,
}
const HeroLane = (props: Props) => {

    const [hero, setHero] = useState<null | JSX.Element>(null)
    useEffect(() => {

        setHero(<Hero laneNumber={props.laneNumber} setHero={setHero} className={props.className} />)

    }, [props.laneNumber, props.className])

    return (
        <div
            className='HeroLane relative  w-1/5 h-full'
            onClick={() => { setHero(<Hero laneNumber={props.laneNumber} setHero={setHero} className={props.className} />) }}
        >
            <span className='absolute inset-0 flex justify-center items-center text-gray-500 text-xs z-0 border-t border-b border-gray-800'>
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