import React from 'react'


type Props = {
    classname: string
}
const PlayArea = (props: Props) => {
    return (
        <div className={`${props.classname}`}>
            <div className='CharacterArea flex bg-pink-200 h-2/5'>
                <div className='CharacterLane bg-green-200 w-1/5 h-full'>
                <div className='Character h-full'>
                    <div className='h-1/3 flex justify-center items-center bg-slate-300'>00</div>
                    <div className='h-1/3 flex justify-center items-center bg-slate-400'>00</div>
                    <div className='h-1/3 flex justify-center items-center bg-slate-500'>00</div>
                </div>
                </div>
            </div>
            <div className='HeroArea h-1/5'></div>
            <div className='CharacterArea bg-pink-200 h-2/5'></div>
        </div>
    )
}

export default PlayArea