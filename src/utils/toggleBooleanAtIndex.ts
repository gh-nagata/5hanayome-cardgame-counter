/**
 * 指定したインデックスの真偽値を反転する
 * 
 * @param i 反転する要素のインデックス（boolean 配列内の位置）
 * @param setReactState React の状態を更新する関数（React.Dispatch<React.SetStateAction<boolean[]>>）
 */
const toggleBooleanAtIndex = (i: number, setReactState: (value: React.SetStateAction<boolean[]>) => void) => {
    setReactState(prevState => {
        const newState = [...prevState];
        newState[i] = !newState[i];
        return newState;
    });
};

export default toggleBooleanAtIndex