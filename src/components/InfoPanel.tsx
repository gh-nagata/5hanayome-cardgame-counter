import clsx from 'clsx'
import React from 'react'
import WaitingRoomCount from './WaitingRoomCount'


type Props = {
    classname?: string
}
const InfoPanel = (props: Props) => {
    return (
        // <div className='InfoPanel  bg-red-400 tall:h-14'>
        <div className={clsx('InfoPanel flex justify-between', props.classname)}>
            {/* InfoPanel */}
            <WaitingRoomCount classname=''/>
            {/* <div className='MinusCount bg-blue-300 flex'>
                <div className='flex justify-center items-center tall:mx-4'>
                    -3 × 4
                </div>
                <div className='flex justify-center items-center tall:mx-4'>
                    -8 × 4
                </div>
            </div> */}
        </div>
    )
}

export default InfoPanel