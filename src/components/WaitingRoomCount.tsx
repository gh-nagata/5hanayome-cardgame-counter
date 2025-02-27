import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    classname?: string
}
const WaitingRoomCount = (props: Props) => {

    const [waitingRoomCount, setWaitingRoomCount] = useState(0)
    const [selectVisible, setSelectVisible] = useState(false)

    return (
        <div className={clsx('WaitingRoom  bg-white flex justify-center items-center', props.classname)}>
            <button
                className='w-12 h-full  bg-blue-500 text-white'
                onClick={() => setWaitingRoomCount((prev) => Math.max(0, prev - 1))}
            >-</button>
            <div className='w-24 h-full relative'>
                <div className='h-full'>
                    <select
                        className={clsx('absolute w-full h-full', selectVisible ? 'opacity-100' : 'opacity-0')}
                        style={{ textAlignLast: 'center' }}  // iPhoneで中央揃え
                        onFocus={() => setSelectVisible(true)}
                        onBlur={() => setSelectVisible(false)}
                        value={waitingRoomCount}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setWaitingRoomCount(value)
                            e.target.blur()
                        }}
                    >
                        {[...Array(51)].map((_, i) => 50 - i).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <div className='w-full h-full flex flex-col'>

                        <div className='flex justify-center items-center flex-1'>
                            控え室 × {waitingRoomCount}
                        </div>
                        <div className='flex justify-center items-center flex-1'>
                            キッカケ {Math.floor(waitingRoomCount / 5) + 2}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className='w-12 h-full bg-red-500 text-white'
                onClick={() => setWaitingRoomCount((prev) => Math.min(50, prev + 1))} 
                >+</button>
        </div>
    )
}

export default WaitingRoomCount