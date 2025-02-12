import { div } from "framer-motion/m";
import React, { useState, useEffect } from "react";

type Props = {
    className?: string;
};

const SidePanel = (props: Props) => {

    const [mode, setMode] = useState('coin')

    const [time, setTime] = useState(20 * 60); // 20分（秒単位）
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1); // 0以下でも減り続ける
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds: number) => {
        const baseTime = 0; // 0分を基準にする（マイナス判定用）
        const diff = seconds - baseTime; // 0との比較

        const isOver = diff < 0; // 0を下回ったらマイナス扱い
        const absDiff = Math.abs(diff); // 絶対値を取る
        const minutes = Math.floor(absDiff / 60);
        const secs = absDiff % 60;

        return `${isOver ? "-" : ""}${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleStart = () => setIsRunning(true);
    const handleReset = () => {
        setIsRunning(false);
        setTime(20 * 60);
    };

    const [turn, setTurn] = useState<"先攻" | "後攻" | null>(null);
    const [flipping, setFlipping] = useState(false);
    const [rotation, setRotation] = useState(0); // 回転角度を管理

    const flipCoin = () => {
        if (flipping) return;

        setFlipping(true);
        setTurn(null); // 回転中は表示しない

        // 一瞬 transform をリセットすることで、リフローを強制
        setRotation(0);
        setTimeout(() => {
            setRotation(1080); // 3回転させる
        }, 10); // 短い遅延を入れることで確実にアニメーションが適用される

        setTimeout(() => {
            setTurn(Math.random() < 0.5 ? "先攻" : "後攻");
            setFlipping(false);
        }, 1500); // 回転時間を長めに
    };

    return (
        <div className={`${props.className} h-screen w-16 text-white flex flex-col items-center justify-between `}>
            <div className="flex flex-col items-center">
                <div
                    className="w-10 h-10 font-bold text-xs bg-stone-950 border border-white m-2 rounded-full flex items-center justify-center"
                    onClick={() => {
                        if (window.confirm("ページを更新しますか？")) {
                            window.location.reload();
                        }
                    }}
                >
                    リロード
                </div>

                {(mode === 'coin') && <div className="w-12 h-6 bg-white text-black text-center rounded  m-2" onClick={() => { setMode('time') }}>コイン</div >}
                {(mode === 'time') && <div className="w-12 h-6 bg-white text-black text-center rounded  m-2" onClick={() => { setMode('coin') }}>タイム</div >}
                {(mode === 'coin') && <div
                    className="coin m-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white text-lg cursor-pointer"
                    style={{
                        transform: `rotateX(${rotation}deg)`, // 3回転
                        transition: rotation ? "transform 1.5s linear" : "none", // リセット時はアニメーションなし
                    }}
                    onClick={flipCoin}
                >
                    {flipping ? "" : turn ?? ""}
                </div>}
            </div>


            {(mode === 'time') && <>
                <div className={`text-lg font-bold  ${time < 0 ? "text-red-500" : ""}`}>
                    {formatTime(time)}
                </div>

                <div className="flex flex-col space-y-2 mb-20">
                    <button
                        onClick={handleStart}
                        className="my-16 bg-blue-500 text-white rounded hover:bg-blue-600 h-8 w-24 rotate-90"
                    >
                        スタート
                    </button>
                    <button
                        onClick={handleReset}
                        className="my-20 bg-red-500 text-white rounded hover:bg-red-600 h-8 w-24 rotate-90"
                    >
                        リセット
                    </button>
                </div>
            </>}
        </div>
    );
};
// const testCoinFlip = () => {
//     let firstCount = 0;
//     let secondCount = 0;

//     for (let i = 0; i < 1000; i++) {
//         const result = Math.random() < 0.5 ? "先攻" : "後攻";
//         if (result === "先攻") {
//             firstCount++;
//         } else {
//             secondCount++;
//         }
//     }

//     console.log(`先攻: ${firstCount}, 後攻: ${secondCount}`);
// };

// // 実行
// testCoinFlip();

export default SidePanel;
