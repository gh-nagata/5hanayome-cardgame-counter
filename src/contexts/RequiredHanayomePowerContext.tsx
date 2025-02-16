import React, { createContext, useContext, useEffect, useState } from 'react';

type RequiredHanayomePowerType = {
    requiredHanayomePower: number[]
    setRequiredHanayomePower: React.Dispatch<React.SetStateAction<number[]>>
};

const RequiredHanayomePower = createContext<RequiredHanayomePowerType | null>(null);

type Props = {
    children: React.ReactNode;
};

export const RequiredHanayomePowerProvider = (props: Props) => {

    const [requiredHanayomePower, setRequiredHanayomePower] = useState([10, 10, 10, 10, 10,])

    useEffect(() => {
        console.log(requiredHanayomePower);
        return () => {
            console.clear();
        }
    }, [...requiredHanayomePower])


    return (
        <RequiredHanayomePower.Provider value={{ requiredHanayomePower, setRequiredHanayomePower }}> {/* あとで適切な value をセット */}
            {props.children}
        </RequiredHanayomePower.Provider>
    );
};

export const useRequiredHanayomePower = (): RequiredHanayomePowerType => {
    const context = useContext(RequiredHanayomePower);
    if (context === null) {
        throw new Error('RequiredHanayomePower must be used within a RequiredHanayomePowerProvider');
    }
    return context;
};