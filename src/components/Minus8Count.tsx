import clsx from 'clsx'
import React, { useState } from 'react'

type Props = {
    classname?: string
}
const Minus8Count = (props: Props) => {

    const [minus8Count, setMinus8Count] = useState(0)
    const [selectVisible, setSelectVisible] = useState(false)

    return (
        <div className={clsx('BougaiCount h-full w-1/2 bg-white flex items-center', props.classname)}>
            <button
                className='w-12 h-full  bg-blue-500 text-white'
                onClick={() => setMinus8Count((prev) => Math.max(0, prev - 1))}
            >-</button>
            <div className='flex-1 h-full relative'>
                <div className='h-full'>
                    <select
                        className={clsx('absolute w-full h-full', selectVisible ? '' : 'opacity-0')}
                        style={{ textAlignLast: 'center' }}  // iPhoneで中央揃え
                        onFocus={() => setSelectVisible(true)}
                        onBlur={() => setSelectVisible(false)}
                        value={minus8Count}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setMinus8Count(value)
                            e.target.blur()
                        }}
                    >
                        {[...Array(5)].map((_, i) => 4 - i).map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                    <div className='w-full h-full flex flex-col'>

                        <div className='flex justify-center items-center flex-1'>
                            -8 × {minus8Count}
                        </div>
                        {/* <div className='flex justify-center items-center flex-1'>
                            キッカケ {Math.floor(minus8Count / 5) + 2}
                        </div> */}
                    </div>
                </div>
            </div>
            <button
                className='w-12 h-full bg-red-500 text-white'
                onClick={() => setMinus8Count((prev) => Math.min(4, prev + 1))} 
                >+</button>
        </div>
    )
}

export default Minus8Count