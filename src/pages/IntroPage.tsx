import { useState } from "react";
import IntroLogo from "../assets/logo.png";
import { Button, Container } from "reactstrap";
import { Link, useNavigate } from "react-router";
import { openUrl } from "@tauri-apps/plugin-opener";
import { ask, message } from "@tauri-apps/plugin-dialog";
import SetupModal from "./SetupModal"; // <--- qo‘shamiz

const IntroPage = () => {
    const navigate = useNavigate();
    const [showSetup, setShowSetup] = useState(false);

    const openToOraclePage = async () => {
        const answer = await ask("Siz haqiqatdan ham Java JDK yuklab olish sahifasiga o'tmoqchimisiz?", {
            kind: "info",
            title: "Info",
            cancelLabel: "Yo'q",
            okLabel: "Ha",
        });

        if (answer) {
            await openUrl("https://www.oracle.com/java/technologies/downloads/");
        }
    };

    const goToHomePage = async () => {
        try {
            // ⚙️ Modalni yoqamiz
            setShowSetup(true);
        } catch (e) {
            await message("Bosh sahifaga o'tishda xatolik yuz berdi: " + e, {
                kind: "error",
                title: "Xatolik",
            });
        }
    };

    const handleSetupComplete = async () => {
        console.log(
            "Setup tugadi, endi bosh sahifaga o'tish mumkin."
        )
        setShowSetup(false);
        await message("Ma'lumotlar muvaffaqiyatli yuklab olindi ✅", {
            kind: "info",
            title: "Tayyor!",
        });
        navigate("home");
    };

    return (
        <Container
            fluid
            className="aref-ruqaa-400 bg-body min-vh-100 d-flex align-items-center justify-content-center"
        >
            {showSetup && <SetupModal onComplete={handleSetupComplete} />}

            <Container className="text-center text-white d-flex flex-column align-items-center">
                <div
                    className="rounded-circle overflow-hidden shadow-sm mb-3"
                    style={{ width: 100, height: 100 }}
                >
                    <img src={IntroLogo} alt="" className="w-100" />
                </div>
                <h3 className="text-white aref-ruqaa-700 fw-bold display-6 mb-2">AlgoJava</h3>
                <p className="fs-4">
                    Java dasturlash tili orqali o’z algoritmik bilimlaringizni kuchaytiring.
                </p>
                <p className="fs-4">
                    Ushbu dasturdan foydalanish uchun sizning kompyuteringizda{" "}
                    <Link to="#" onClick={openToOraclePage}>
                        Java JDK
                    </Link>{" "}
                    o’rnatilgan bo’lishi kerak!
                </p>

                <Button
                    onClick={goToHomePage}
                    color="success"
                    className="pb-2 px-5 bg-gradient mt-2"
                    size="lg"
                >
                    Boshlash
                </Button>
            </Container>

            <span
                onClick={openToCreatorInfoModal}
                className="text-muted small position-fixed bottom-0 end-0 m-2 cursor-pointer"
            >
                Dastur muallifi © 2024
            </span>
        </Container>
    );
};

const openToCreatorInfoModal = async () => {
    await message(
        "Ushbu dastur Dilshod Fayzullayev tomonidan yaratilgan.\n\nGitHub: https://github.com/bug4you/\n\nDizayn uchun Sirojiddin Bazarbayevga alohida rahmat.",
        {
            kind: "info",
            title: "Dastur muallifi",
        }
    );
};

export default IntroPage;
