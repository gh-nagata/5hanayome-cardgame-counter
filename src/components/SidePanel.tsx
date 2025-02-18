import React, { useState, useEffect } from "react";

type Props = {
    className?: string;
};

const SidePanel = (props: Props) => {
    const [time, setTime] = useState(20 * 60); // 20分（秒単位）
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

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

    const handleStart = async () => {
        setIsRunning(true);
        setStartTime(Date.now() - (20 * 60 - time) * 1000);

        // Wake Lock APIのリクエスト
        if ("wakeLock" in navigator) {
            try {
                const lock = await navigator.wakeLock.request("screen");
                setWakeLock(lock);

                // Wake Lockが解除されたときの処理
                lock.addEventListener("release", () => {
                    console.log("Wake Lock released.");
                    setWakeLock(null);
                });

                console.log("Wake Lock acquired.");
            } catch (err) {
                console.error("Failed to acquire Wake Lock:", err);
            }
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(20 * 60);
        setStartTime(null);

        // Wake Lockを解除
        if (wakeLock) {
            wakeLock.release().then(() => setWakeLock(null));
        }
    };

    const formatTime = (seconds: number) => {
        const isOver = seconds < 0;
        const absDiff = Math.abs(seconds);
        const minutes = Math.floor(absDiff / 60);
        const secs = absDiff % 60;

        return `${isOver ? "-" : ""}${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className={`${props.className} text-white flex justify-between
        wide:flex-col
        `}>
            <a href="" target="_blank" className="font-bold flex justify-center items-center text-center text-base h-12
            wide:mt-8
            tall:ml-12
            ">
                使い方
            </a>

            <div
                className={`
                text-lg font-bold w-12 flex justify-center items-center h-12
                wide:mb-8
                tall:mr-12
                ${time < 0 ? "text-red-500" : ""}`}
                onClick={() => {
                    if (!isRunning) {
                        handleStart();
                    } else {
                        if (window.confirm("対戦を終了しますか？")) window.location.reload();
                    }
                }}
            >
                {formatTime(time)}
            </div>
        </div>
    );
};

export default SidePanel;
