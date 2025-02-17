import { defaultHeroState, heroStateType } from "../types/heroStateType";

type UpdateHeroStatesType = {
    heroStates: [heroStateType[], React.Dispatch<React.SetStateAction<heroStateType[]>>];
    lane: number;
    key: keyof heroStateType;
    value: heroStateType[keyof heroStateType];
};
export const updateHeroStates = ({ heroStates, lane, key, value }: UpdateHeroStatesType) => {
    const [states, setStates] = heroStates;
    const newStates = states.map((hero, i) =>
        i === lane ? { ...hero, [key]: value } : hero
    );
    setStates(newStates);
}

type SwapHeroStatesType = {
    heroStates: [heroStateType[], React.Dispatch<React.SetStateAction<heroStateType[]>>];
    laneA: number;
    laneB: number;
}
export const swapHeroStates = ({ heroStates, laneA, laneB }: SwapHeroStatesType) => {
    if (laneA === laneB) return;
    const [states, setStates] = heroStates;
    const newStates = [...states];
    [newStates[laneA], newStates[laneB]] = [newStates[laneB], newStates[laneA]];
    setStates(newStates);
};

type ResetHeroStatesType = {
    heroStates: [heroStateType[], React.Dispatch<React.SetStateAction<heroStateType[]>>];
    lane: number
}
export const resetHeroStates = ({ heroStates, lane }: ResetHeroStatesType) => {
    const [states, setStates] = heroStates;
    const newStates = [...states];
    newStates[lane] = defaultHeroState;
    setStates(newStates)
}