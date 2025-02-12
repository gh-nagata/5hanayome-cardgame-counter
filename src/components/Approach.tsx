import React, { useEffect, useMemo, useState } from 'react'
import { useRequiredBridalPower } from '../contexts/RequiredBridalPowerContext';



type Props = {
    number: number,
}
const Approach = (props: Props) => {

    const {
        requiredBridalPower1,
        requiredBridalPower2,
        requiredBridalPower3,
        requiredBridalPower4,
        requiredBridalPower5,
    } = useRequiredBridalPower();

    const [requiredPower1,] = requiredBridalPower1
    const [requiredPower2,] = requiredBridalPower2
    const [requiredPower3,] = requiredBridalPower3
    const [requiredPower4,] = requiredBridalPower4
    const [requiredPower5,] = requiredBridalPower5

    const [requiredPower, setRequiredPower] = useState(0)

    useEffect(() => {
        switch (props.number) {
            case 1:
                setRequiredPower(requiredPower1);
                break;
            case 2:
                setRequiredPower(requiredPower2);
                break;
            case 3:
                setRequiredPower(requiredPower3);
                break;
            case 4:
                setRequiredPower(requiredPower4);
                break;
            case 5:
                setRequiredPower(requiredPower5);
                break;
            default:
                break;
        }

        return () => {

        }
    }, [props.number, requiredPower1, requiredPower2, requiredPower3, requiredPower4, requiredPower5])



    return (
        <div className=''>{requiredPower}</div>
    )
}

export default Approach