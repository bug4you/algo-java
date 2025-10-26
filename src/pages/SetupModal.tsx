import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { WifiOff, ShieldCheck, Download, Database } from "lucide-react";
import "../SetupModal.css";

// @ts-ignore
export default function SetupModal({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "downloading" | "offline" | "done">("idle");

    const [steps, setSteps] = useState([
        { icon: <Download size={18} />, label: "Ma'lumotlarni yuklab olish", done: false },
        { icon: <Database size={18} />, label: "Lokal bazaga yozish", done: false },
        { icon: <ShieldCheck size={18} />, label: "Ma'lumotlarni shifrlash", done: false },
    ]);

    const startDownload = async () => {
        setStatus("downloading");
        try {
            // 🔌 internetni tekshirish
            const online = window.navigator.onLine;
            if (!online) {
                setStatus("offline");
                return;
            }

            // 🧩 step-by-step simulyatsiya
            for (let i = 0; i < steps.length; i++) {
                await new Promise((r) => setTimeout(r, 1500));
                setProgress((i + 1) * 33);
                setSteps((prev) =>
                    prev.map((s, index) => (index === i ? { ...s, done: true } : s))
                );
            }

            setProgress(100);
            await new Promise((r) => setTimeout(r, 1000));
            setStatus("done");
        } catch (e) {
            setStatus("offline");
        }
    };

    const restart = () => {
        setProgress(0);
        setSteps(steps.map((s) => ({ ...s, done: false })));
        setStatus("idle");
    };

    useEffect(() => {
        const handleOffline = () => setStatus("offline");
        window.addEventListener("offline", handleOffline);
        return () => window.removeEventListener("offline", handleOffline);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="setup-modal-overlay"
        >
            {status === "done" && <Confetti recycle={false} numberOfPieces={250} />}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`setup-modal-window ${
                    status === "done" ? "success-gradient" : ""
                }`}
            >
                {status === "idle" && (
                    <>
                        <h2>🔰 Ma'lumotlarni yuklab olish</h2>
                        <p>
                            Ushbu jarayon ilova uchun zarur ma'lumotlarni yuklab olish va
                            ularni xavfsiz tarzda shifrlashni amalga oshiradi.
                            <br /> Bu xavfsiz va faqat rasmiy server bilan ishlaydi.
                        </p>
                        <button className="btn-start" onClick={startDownload}>
                            Yuklab olishni boshlash
                        </button>
                    </>
                )}

                {status === "downloading" && (
                    <>
                        <h2>⬇️ Yuklab olayapmiz...</h2>
                        <div className="steps">
                            {steps.map((s, i) => (
                                <div key={i} className="step">
                                    {s.icon}
                                    <span>{s.label}</span>
                                    {s.done ? "✅" : "⏳"}
                                </div>
                            ))}
                        </div>
                        <div className="progress-bar">
                            <motion.div
                                className="progress-inner"
                                animate={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="note">Iltimos, internetni uzmang. Jarayon 5-10 soniya davom etadi.</p>
                    </>
                )}

                {status === "offline" && (
                    <>
                        <div className="offline">
                            <WifiOff size={42} color="#ff6b6b" />
                            <h3>Internet ulanmagan</h3>
                            <p>
                                Ma'lumotlarni yuklab bo'lmadi. Iltimos, internetga ulanib qayta
                                urinib ko‘ring.
                            </p>
                            <button onClick={restart} className="btn-retry">
                                Qayta urinib ko‘rish
                            </button>
                        </div>
                    </>
                )}

                {status === "done" && (
                    <>
                        <h2 className="text-shadow">🎉 Tabriklaymiz!</h2>
                        <p className="success-text">
                            Ma'lumotlar muvaffaqiyatli yuklab olindi va shifrlab saqlandi.
                        </p>
                        <button className="btn-continue" onClick={onComplete}>
                            Boshlash 🚀
                        </button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}
