import { useState, useEffect, Key } from "react";
import Confetti from "react-confetti";
import quotes from "./quotes.json";

interface Result {
    status: "OK" | "FAIL";
    method: string | undefined | null;
    expected: string | undefined | null;
    result: string | undefined | null;
}

interface ResultModalProps {
    results: Result[];
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}

const TestResultModal = ({ results, setShowModal, showModal }: ResultModalProps) => {
    const [confetti, setConfetti] = useState(false);
    const [randomQuote, setRandomQuote] = useState<{ text: string; author: string } | null>(null);

    const allPassed = results.every((r) => r.status === "OK");

    // Confetti + Aforizm tanlash
    useEffect(() => {
        if (showModal) {
            setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }

        if (showModal && allPassed) {
            setConfetti(true);
            const timer = setTimeout(() => setConfetti(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [showModal, allPassed]);

    return (
        <>
            {confetti && <Confetti recycle={false} />}

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.65)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "linear-gradient(145deg, #1e1e1e, #252525)",
                            color: "#f8f8f2",
                            borderRadius: 12,
                            width: "80%",
                            maxWidth: 850,
                            padding: 28,
                            boxShadow: "0 0 25px rgba(0,0,0,0.5)",
                            position: "relative",
                            fontFamily: "JetBrains Mono, monospace",
                            border: "1px solid #333",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2
                            style={{
                                textAlign: "center",
                                fontSize: 22,
                                marginBottom: 20,
                                background: allPassed
                                    ? "linear-gradient(90deg, #8fff8f, #00ffcc)"
                                    : "linear-gradient(90deg, #ff7b7b, #ff3d3d)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {allPassed ? "✅ Barcha testlar muvaffaqiyatli o'tdi!" : "❌ Ba'zi testlar muvaffaqiyatsiz yakunlandi"}
                        </h2>

                        <div
                            style={{
                                overflowX: "auto",
                                borderRadius: 8,
                                border: "1px solid #333",
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    minWidth: 600,
                                }}
                            >
                                <thead>
                                <tr
                                    style={{
                                        backgroundColor: "#333",
                                        color: "#fff",
                                        textAlign: "left",
                                    }}
                                >
                                    <th style={{ padding: "10px 12px" }}>🧩 ID</th>
                                    <th style={{ padding: "10px 12px" }}>Metod</th>
                                    <th style={{ padding: "10px 12px" }}>Kutilgan</th>
                                    <th style={{ padding: "10px 12px" }}>Sizning natijangiz</th>
                                    <th style={{ padding: "10px 12px", textAlign: "center" }}>Holat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((r: Result, i: Key | null | undefined) => (
                                    <tr
                                        key={i}
                                        style={{
                                            backgroundColor: r.status === "OK" ? "#1f2d24" : "#2a1f1f",
                                            color: r.status === "OK" ? "#9fff9f" : "#ff9f9f",
                                            borderBottom: "1px solid #333",
                                        }}
                                    >
                                        {/* @ts-ignore */}
                                        <td style={{ padding: "8px 12px" }}>{i + 1}</td>
                                        <td style={{ padding: "8px 12px" }}>
                                            <code>{r.method}</code>
                                        </td>
                                        <td style={{ padding: "8px 12px" }}>
                                            <code>{r.expected}</code>
                                        </td>
                                        <td style={{ padding: "8px 12px" }}>
                                            <code>{r.result}</code>
                                        </td>
                                        <td
                                            style={{
                                                padding: "8px 12px",
                                                textAlign: "center",
                                                fontSize: 18,
                                            }}
                                        >
                                            {r.status === "OK" ? "✅" : "❌"}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div
                            style={{
                                marginTop: 20,
                                textAlign: "center",
                                fontSize: 16,
                                color: allPassed ? "#5af78e" : "#ff5555",
                            }}
                        >
                            {allPassed
                                ? "💚 Ajoyib ish! Barcha testlar to‘g‘ri bajarildi 🎉"
                                : "❤️ Ba’zi testlar muvaffaqiyatsiz yakunlandi. Qayta urinib ko‘r 🔁"}
                        </div>

                        {/* 💬 Tasodifiy aforizm */}
                        {randomQuote && (
                            <div
                                style={{
                                    marginTop: 24,
                                    textAlign: "center",
                                    fontStyle: "italic",
                                    fontSize: 15,
                                    color: "#bbb",
                                }}
                            >
                                “{randomQuote.text}”
                                <div style={{ marginTop: 4, fontSize: 13, color: "#888" }}>
                                    — {randomQuote.author}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                marginTop: 30,
                                display: "block",
                                marginLeft: "auto",
                                background: "#444",
                                color: "#fff",
                                padding: "8px 16px",
                                border: "none",
                                borderRadius: 6,
                                cursor: "pointer",
                            }}
                        >
                            Yopish
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TestResultModal;
