import { CharacterStateType, defaultCharacterState } from '../types/characterStateType';

type UpdateCharacterStateType = {
    characterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>];
    lane: number;
    key: keyof CharacterStateType;
    value: CharacterStateType[keyof CharacterStateType];
};
/**
 * ステータスを更新する
 * @characterStates
 * @lane 変更するレーン
 * @key 変更する場所
 * @value 変更する値
 */
export const updateCharacterStates = ({ characterStates, lane, key, value }: UpdateCharacterStateType) => {
    const [states, setStates] = characterStates;
    const newStates = states.map((char, i) =>
        i === lane ? { ...char, [key]: value } : char
    );
    setStates(newStates);
};

type SwapCharacterStateType = {
    characterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>];
    laneA: number;
    laneB: number;
};
/**
 * ステータスを更新する
 * @characterStates
 * @laneA 入れ替えるレーン
 * @indexB 入れ替えるレーン
 */
export const swapCharacterStates = ({ characterStates, laneA, laneB }: SwapCharacterStateType) => {
    if (laneA === laneB) return;
    const [states, setStates] = characterStates;
    const newStates = [...states];
    [newStates[laneA], newStates[laneB]] = [newStates[laneB], newStates[laneA]];
    setStates(newStates);
};

type ResetCharacterStateType = {
    characterStates: [CharacterStateType[], React.Dispatch<React.SetStateAction<CharacterStateType[]>>];
    lane: number;
};
/**
 * ステータスを初期値にリセットする
 * @characterStates
 * @lane リセットするレーン
 */
export const resetCharacterStates = ({ characterStates, lane }: ResetCharacterStateType) => {
    const [states, setStates] = characterStates;
    const newStates = [...states];
    newStates[lane] = defaultCharacterState;
    setStates(newStates)
};
