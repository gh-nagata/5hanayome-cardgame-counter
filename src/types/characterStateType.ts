export type CharacterStateType = {
    hanayomePower: number;
    addHanayomePower: number;
    // isSelect: boolean;
    approachHero: null | number;
};
export const defaultCharacterState: CharacterStateType = {
    hanayomePower: 10,
    addHanayomePower: 0,
    // isSelect: false,
    approachHero: null,
}

