import React, { useEffect } from 'react'

type Props = {
    requiredPower: number,
    setRequiredPower: React.Dispatch<React.SetStateAction<number>>
}
const HeroLane = (props: Props) => {

    const options = Array.from({ length: 5 }, (_, i) => (
        <option key={i + 6} value={i + 6}>
            {i + 6}
        </option>
    ));

    return (
        <div
            className='w-1/5 border border-red-600'
        >
            <select
                className='w-full h-full text-center  ' defaultValue={10}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                    props.setRequiredPower(Number(event.target.value));
                }}
            >
                <option value={0}>-</option>
                {options}
                <option value={12}>12</option>
                <option value={17}>17</option>
            </select>
        </div>
    )
}

export default HeroLane