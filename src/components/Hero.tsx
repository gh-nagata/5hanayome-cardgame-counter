import React, { useState } from 'react'
import hanayomeColor from '../libs/hanayomeColor.json'
import { useInputState } from '../contexts/InputStateContext'

const Hero = () => {

    // const { selectApproach } = useInputState()
    // const [isSelectApproach, setIsSelectApproach] = selectApproach

    const [requiredHanayomePower, setRequiredHanayomePower] = useState(10)

    const [approachedNumber, setApproachedNumber] = useState([
        false, false, false, false, false,
    ])

    const approachedColors = approachedNumber.map((bool, i) => {

        if (!bool) return

        return (
            <div
                className='w-full h-full'
                style={{ backgroundColor: hanayomeColor[i] }}
            />
        )
    })

    return (
        <div className='Hero flex relative w-full h-full font-bold'>
            <div className='w-full h-full absolute flex bg-white'>
                {approachedColors}
            </div>
            <select
                className=' z-10 w-full h-full text-center appearance-none bg-transparent'
                value={requiredHanayomePower}
                onChange={(e) => {
                    // if (isSelectApproach) return;
                    setRequiredHanayomePower(Number(e.target.value))
                }}
                // disabled={isSelectApproach}
            >
                {[...Array(5)].map((_, i) => (
                    <option key={i} value={i + 6}>{i + 6}</option>
                ))}
                <option value={12}>{12}</option>
                <option value={17}>{17}</option>
            </select>
        </div>
    )
}

export default Hero