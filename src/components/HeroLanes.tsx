import React from 'react';
import HeroLane from './HeroLane';
import { useRequiredBridalPower } from '../contexts/RequiredBridalPowerContext';

type Props = {
    className?: string
}
const HeroLanes = (props: Props) => {
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

    return (
        <div className={`HeroLanes flex justify-between ${props.className}`}>
            <HeroLane requiredPower={requiredPower1} setRequiredPower={setRequiredPower1} />
            <HeroLane requiredPower={requiredPower2} setRequiredPower={setRequiredPower2} />
            <HeroLane requiredPower={requiredPower3} setRequiredPower={setRequiredPower3} />
            <HeroLane requiredPower={requiredPower4} setRequiredPower={setRequiredPower4} />
            <HeroLane requiredPower={requiredPower5} setRequiredPower={setRequiredPower5} />
        </div>
    );
};

export default HeroLanes;
