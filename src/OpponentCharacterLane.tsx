import React from 'react'

const OpponentCharacterLane = () => {
    return (
        <div
            className='w-32 h-32 bg-red-300 mx-1 flex justify-between flex-col'
        >
            <div className=' bg-orange-500 w-full h-10'>2</div>
            <div className='sum  bg-orange-800 w-full h-10'>2</div>
            <div className='bg-green-400 h-10 flex justify-between'>
                <div className='bg-red-700 w-10 h-10'></div>
                <div className='bg-red-700 w-10 h-10'></div>
                <div className='bg-red-700 w-10 h-10'></div>
            </div>
        </div>
    )
}

export default OpponentCharacterLane