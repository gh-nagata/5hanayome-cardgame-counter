import React, { useState, useEffect } from "react";
import useWakeLock from "../hooks/useWakeLock";

type Props = {
    className?: string;
};

const SidePanel = (props: Props) => {
    const [time, setTime] = useState(20 * 60); // 20分（秒単位）
    const [isRunning, setIsRunning] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    // Wake Lock API (Android用)
    const { requestWakeLock, releaseWakeLock } = useWakeLock();

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

        // ✅ **iPhone向け：Web Audio API で無音再生**
        if (!audioContext) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContextClass) {
                console.error("Web Audio API がサポートされていません");
                return;
            }

            const ctx = new AudioContextClass();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = 20; // 低周波音（人間にはほぼ聞こえない）
            gainNode.gain.value = 0.001; // 極小の音量（完全な無音はNG）

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            oscillator.start();

            setAudioContext(ctx);
        }

        // ✅ **Android向け：Wake Lock API をリクエスト**
        requestWakeLock();
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(20 * 60);
        setStartTime(null);

        // Web Audio API の無音再生を停止
        if (audioContext) {
            audioContext.close();
            setAudioContext(null);
        }

        // Wake Lock API の解除
        releaseWakeLock();
    };

    const formatTime = (seconds: number) => {
        const isOver = seconds < 0;
        const absDiff = Math.abs(seconds);
        const minutes = Math.floor(absDiff / 60);
        const secs = absDiff % 60;

        return `${isOver ? "-" : ""}${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className={`${props.className} text-white flex flex-col justify-end`}>
            <div
                className={`
                text-lg font-bold w-12 mx-auto flex justify-center items-center h-9 wide:mb-12
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
