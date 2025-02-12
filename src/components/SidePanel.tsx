import React, { useState, useEffect } from "react";

type Props = {
    className?: string;
};

const SidePanel = (props: Props) => {
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

    return (
        <div className={`${props.className} h-screen w-16 bg-gray-800 text-white flex flex-col items-center justify-between p-6`}>
            <h1 className={`text-lg font-bold writing-mode-vertical-rl ${time < 0 ? "text-red-500" : ""}`}>
                {formatTime(time)}
            </h1>
            <div className="flex flex-col space-y-2">
                <button
                    onClick={handleStart}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 writing-mode-vertical-rl"
                >
                    スタート
                </button>
                <button
                    onClick={handleReset}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 writing-mode-vertical-rl"
                >
                    リセット
                </button>
            </div>
        </div>
    );
};

export default SidePanel;
