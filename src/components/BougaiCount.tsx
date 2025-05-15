import clsx from 'clsx'
import React, { useState } from 'react'
import Minus8Count from './Minus8Count'
import Minus3Count from './Minus3Count'

type Props = {
    classname?: string
}
const BougaiCount = (props: Props) => {

    const [waitingRoomCount, setWaitingRoomCount] = useState(0)
    const [selectVisible, setSelectVisible] = useState(false)

    return (
        // <div className={clsx('BougaiCount  bg-white flex justify-center items-center', props.classname)}>
        <div className={clsx('BougaiCount h-12 flex bg-white ', props.classname)}>
            <Minus3Count/>
            <Minus8Count/>
        </div>
    )
}

export default BougaiCount