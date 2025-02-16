import { useState, useEffect } from "react";

const useWakeLock = () => {
    const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

    const requestWakeLock = async () => {
        try {
            if (!wakeLock) {
                const lock = await navigator.wakeLock.request("screen");
                setWakeLock(lock);
                // console.log("Wake Lock is active");

                // Wake Lock が解放されたら自動的に null にする
                lock.addEventListener("release", () => {
                    // console.log("Wake Lock was released");
                    setWakeLock(null);
                });
            }
        } catch (err) {
            console.error("Wake Lock failed:", err);
        }
    };

    const releaseWakeLock = async () => {
        if (wakeLock) {
            await wakeLock.release();
            setWakeLock(null);
            // console.log("Wake Lock released");
        }
    };

    return { requestWakeLock, releaseWakeLock, isActive: !!wakeLock };
};

export default useWakeLock;
