import React, { useState, useEffect } from "react";

type Props = {
    className?: string;
};

const SidePanel = (props: Props) => {
    const [mode, setMode] = useState('coin');
    const [time, setTime] = useState(20 * 60); // 20分（秒単位）
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [turn, setTurn] = useState<"先攻" | "後攻" | null>(null);
    const [flipping, setFlipping] = useState(false);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (startTime !== null) {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                setTime(Math.max(20 * 60 - elapsed, 0));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, startTime]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                setStartTime(Date.now() - (20 * 60 - time) * 1000);
            } else if (document.visibilityState === "visible" && isRunning) {
                const elapsed = Math.floor((Date.now() - (startTime ?? Date.now())) / 1000);
                setTime(Math.max(20 * 60 - elapsed, 0));
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [isRunning, startTime, time]);

    const handleStart = () => {
        setIsRunning(true);
        setStartTime(Date.now() - (20 * 60 - time) * 1000);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(20 * 60);
        setStartTime(null);
    };

    const flipCoin = () => {
        if (flipping) return;

        setFlipping(true);
        setTurn(null);
        setRotation(0);
        setTimeout(() => {
            setRotation(1080);
        }, 10);

        setTimeout(() => {
            setTurn(Math.random() < 0.5 ? "先攻" : "後攻");
            setFlipping(false);
        }, 1500);
    };

    const formatTime = (seconds: number) => {
        const isOver = seconds < 0;
        const absDiff = Math.abs(seconds);
        const minutes = Math.floor(absDiff / 60);
        const secs = absDiff % 60;

        return `${isOver ? "-" : ""}${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className={`${props.className} h-screen w-16 text-white flex flex-col items-center justify-between`}>
            <div className="flex flex-col items-center">
                <div className="w-12 h-8 font-bold text-xs bg-stone-950 border border-white m-2 rounded-lg flex items-center justify-center"
                    onClick={() => { if (window.confirm("ページを更新しますか？")) window.location.reload(); }}>
                    リロード
                </div>
                {(mode === 'coin') && <div className="w-12 h-8 bg-white text-black rounded-lg m-2 flex items-center justify-center font-medium" onClick={() => { setMode('time'); }}>コイン</div>}
                {(mode === 'time') && <div className="w-12 h-8 bg-white text-black rounded-lg m-2 flex items-center justify-center font-medium" onClick={() => { setMode('coin'); }}>タイム</div>}
                {(mode === 'coin') && <div className="coin m-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white text-lg cursor-pointer font-bold"
                    style={{ transform: `rotateX(${rotation}deg)`, transition: rotation ? "transform 1.5s linear" : "none" }}
                    onClick={flipCoin}>
                    {flipping ? "" : turn ?? ""}
                </div>}
            </div>
            {(mode === 'time') && <>
                <div className={`text-lg font-bold ${time < 0 ? "text-red-500" : ""}`}>
                    {formatTime(time)}
                </div>
                <div className="flex flex-col space-y-2 mb-20">
                    <button onClick={handleStart} className="my-16 bg-blue-500 text-white rounded hover:bg-blue-600 h-8 w-24 rotate-90">スタート</button>
                    <button onClick={handleReset} className="my-20 bg-red-500 text-white rounded hover:bg-red-600 h-8 w-24 rotate-90">リセット</button>
                </div>
            </>}
        </div>
    );
};

export default SidePanel;
