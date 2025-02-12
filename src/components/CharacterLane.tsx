import React, { useEffect, useState } from 'react';
import Approach from './Approach';
import { useRequiredBridalPower } from '../contexts/RequiredBridalPowerContext';

type Props = {
    number: number;
    opponentCharacterLane?: boolean
};

const CharacterLane = (props: Props) => {

    const {
        requiredBridalPower1,
        requiredBridalPower2,
        requiredBridalPower3,
        requiredBridalPower4,
        requiredBridalPower5,
    } = useRequiredBridalPower();

    const [requiredPower1, setRequiredPower1] = requiredBridalPower1
    const [requiredPower2, setRequiredPower2] = requiredBridalPower2
    const [requiredPower3, setRequiredPower3] = requiredBridalPower3
    const [requiredPower4, setRequiredPower4] = requiredBridalPower4
    const [requiredPower5, setRequiredPower5] = requiredBridalPower5

    const [power, setPower] = useState(0);
    const [plusPower, setPlusPower] = useState(0);
    const [selectedApproach, setSelectedApproach] = useState<number | null>(null);
    // const [selectedPower, setSelectedPower] = useState<number>(0);

    const [totalPower, setTotalPower] = useState(0);

    // selectedApproach に対応する requiredPower を取得
    const getRequiredPower = (approach: number | null) => {
        switch (approach) {
            case 1: return requiredPower1;
            case 2: return requiredPower2;
            case 3: return requiredPower3;
            case 4: return requiredPower4;
            case 5: return requiredPower5;
            default: return 0;
        }
    };

    useEffect(() => {
        const selectedRequiredPower = getRequiredPower(selectedApproach);
        if (power) {
            if (selectedApproach) {
                setTotalPower(power + plusPower - selectedRequiredPower);
            } else {
                setTotalPower(power + plusPower);
            }
        } else {
            setTotalPower(0);
        }
    }, [power, ,
        plusPower,
        selectedApproach,
        requiredPower1,
        requiredPower2,
        requiredPower3,
        requiredPower4,
        requiredPower5,]);

    const approaches = Array.from({ length: 3 }, (_, i) => { // 2 -> [1, 2, 3]
        const value = props.number + (i - 1);

        return (
            <div
                key={value}
                onClick={() => {
                    if (value === selectedApproach) {
                        setSelectedApproach(null);
                        // setSelectedPower(0);
                    } else {
                        setSelectedApproach(value);
                    }
                }}
                className={`
                    w-1/3 flex items-center justify-center cursor-pointer border border-red-600
                    ${value === 0 || value === 6 ? `invisible pointer-events-none` : ``}
                    ${value === selectedApproach ? `text-white font-bold bg-red-600` : ``}
                `}
            >
                <Approach number={value} />
            </div>
        );
    });

    const options = Array.from({ length: 50 }, (_, i) => (
        <option key={i + 1} value={i + 1}>
            {i + 1}
        </option>
    ));

    return (
        <div className='w-1/5 border border-red-600 flex flex-col'>
            <div className={`h-1/4 flex justify-between ${props.opponentCharacterLane ? 'order-2' : 'order-1'}`}>
                {approaches}
            </div>
            <div className={`h-3/4 flex ${props.opponentCharacterLane ? 'order-1' : 'order-2'}`}>
                <div className='h-full w-8/12 flex justify-between flex-col'>
                    <div className=' w-full h-1/2'>
                        <select
                            className='w-full h-full text-center'
                            defaultValue={0}
                            onChange={(event) => setPower(Number(event.target.value))}
                        >
                            <option value={0}>-</option>
                            {options}
                        </select>
                    </div>
                    <div className='sum  w-full h-1/2'>
                        <select
                            className='w-full h-full text-center'
                            defaultValue={0}
                            onChange={(event) => setPlusPower(Number(event.target.value))}
                        >
                            <option value={0}>-</option>
                            {options}
                        </select>
                    </div>
                </div>
                <div className="total h-full w-4/12 text-center flex items-center justify-center flex-col">
                    total
                    <br />
                    <div className={`${selectedApproach ? `text-red-600 font-bold` : ``}`}>
                        {totalPower}
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default CharacterLane;
