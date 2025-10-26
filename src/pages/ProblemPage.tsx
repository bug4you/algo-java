import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Button, Col, Container, Nav, Row, TabContent, TabPane} from "reactstrap";
import {useNavigate, useParams} from "react-router";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ReactCodeMirror from '@uiw/react-codemirror';
import {java} from '@codemirror/lang-java';
import {oneDark} from "@codemirror/theme-one-dark";
import {BugPlay, Loader2, PlayIcon} from "lucide-react";
import IconLeft from "../assets/left.png"
import IconHome from "../assets/home.png"
import IconRight from "../assets/right.png"
import TestResultModal from "../TestResultModal.tsx";

const problems = [
    {id: 1, title: "stringE", level: "Oson", completed: true},
    {id: 2, title: "firstLast6", level: "Oson", completed: false},
    {id: 3, title: "noTriples", level: "O‘rtacha", completed: false},
    {id: 4, title: "has22", level: "Qiyin", completed: false},
    {id: 5, title: "countYZ", level: "Oson", completed: true},
    {id: 6, title: "endOther", level: "O‘rtacha", completed: false},
    {id: 7, title: "starOut", level: "Qiyin", completed: false},
    {id: 8, title: "withoutX", level: "Oson", completed: true},
];

export default function ProblemPage() {
    const {problemId} = useParams();
    const [showModal, setShowModal] = useState<boolean>(false);
    // @ts-ignore
    const [code, setCode] = useState<string>("public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}");
    const [activeTab, setActiveTab] = useState<"question" | "result">("question");
    const navigate = useNavigate();

    const changeTab = (tab: "question" | "result" = "question") => setActiveTab(tab);

    const getProblem = (): { id: number, title: string, level: string, completed: boolean } => {
        let filterItem = problems.filter(prob => prob.id.toString() === problemId);
        if (filterItem.length > 0) {
            return filterItem[0];
        }
        return {id: 0, title: "Noma'lum masala", level: "Noma'lum", completed: false};
    }

    useEffect(() => {
        if (activeTab === "result") {
            // Simulate running tests when switching to result tab
            setShowModal(true);
        }
    }, [activeTab]);

    const goToHomePage = () => {
        navigate("/home", {replace: false});
    }

    return (
        <Container fluid className={"bg-body google-sans-code"}>
            <Container className={'bg-body'}>
                <h1 className={"aref-ruqaa-700"}>AlgoJava</h1>
                <hr/>
                <div className={"d-flex justify-content-start align-items-center gap-2"}>
                    <div className={'fs-4 fw-medium text-white'}>{getProblem().title}</div>
                    <Button onClick={goToHomePage} color={'dark'}>
                        <img src={IconHome} alt="Home" style={{width: 13}}/>
                    </Button>
                    <Button onClick={goToHomePage} color={'dark'}>
                        <img src={IconLeft} alt="Back" style={{width: 13}}/>
                    </Button>
                    <Button onClick={goToHomePage} color={'dark'}>
                        <img src={IconLeft} alt="Back" style={{width: 13}}/>
                        &nbsp;
                        Oldingi
                    </Button>
                    <Button onClick={goToHomePage} color={'dark'}>
                        Keyingi
                        &nbsp;
                        <img src={IconRight} alt="Next" style={{width: 13}}/>
                    </Button>
                </div>
                <Row>
                    <Col md={6} className={"mt-4"}>
                        <div className={'bg-dark rounded-3 shadow'} style={{height: 400}}>
                            <Nav card pills tabs className={'mb-1 shadow px-3 py-2 rounded-top-3 bg-body'}>
                                <Button onClick={() => changeTab("question")} className={"me-2"}
                                        active={activeTab == "question"}>Ko'rsatmalar</Button>
                                <Button onClick={() => changeTab("result")} className={""}
                                        active={activeTab == "result"}>Natijalar</Button>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId={"question"}>
                                    <MarkdownRenderer/>
                                </TabPane>
                                <TabPane tabId={"result"}>
                                    <MarkdownResultRenderer
                                        results={[
                                            {
                                                method: 'helloName("Bob")',
                                                expected: 'Hello Bob!',
                                                result: 'Hello Bob!',
                                                status: 'OK'
                                            },
                                            {
                                                method: 'helloName("Alice") ',
                                                expected: 'Hello Alice!',
                                                result: 'Hello Alice!',
                                                status: 'OK'
                                            },
                                            {
                                                method: 'helloName("Z") ',
                                                expected: 'Hello Z!',
                                                result: 'Hello X!',
                                                status: 'OK'
                                            },
                                        ]}
                                    />
                                </TabPane>
                            </TabContent>
                        </div>
                    </Col>
                    <Col md={6} className={"mt-4"}>
                        <div className={'bg-dark rounded-3 shadow position-relative'} style={{minHeight: 400}}>
                            <Nav card pills
                                 className={'mb-1 shadow px-3 py-2 rounded-top-3 bg-body d-flex justify-content-between'}>
                                <Button className={"me-2 bg-transparent bg-body border-0"}>Ko'rsatmalar</Button>
                                {/*TODO: RESET BUTTON*/}
                                <Button>Reset</Button>
                            </Nav>
                            <CodeEditor
                                showModal={showModal}
                                setShowModal={setShowModal}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

interface CodeEditorProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    showModal: boolean;
}

function CodeEditor({showModal, setShowModal}: CodeEditorProps) {
    const [code, setCode] = useState<string>(`public boolean stringE(String str) {
    int count = 0;
    for (int i = 0; i < str.length(); i++) {
        if (str.charAt(i) == 'e') {
            count++;
        }
    }
    return count >= 1 && count <= 3;
}`);

    const [loading, setLoading] = useState(false);
    const [finalLoading, setFinalLoading] = useState(false);

    const handleCheck = async () => {
        setLoading(true);
        // Simulyatsiya uchun 2 soniyalik “tekshirish” jarayoni
        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);
        setShowModal(true);
    };

    const handleRun = async () => {
        setFinalLoading(true);
        // Simulyatsiya uchun 2 soniyalik “ishga tushirish” jarayoni
        await new Promise((r) => setTimeout(r, 2000));
        setFinalLoading(false);
        alert("✅ Kod muvaffaqiyatli ishga tushirildi!");
    }

    return (
        <>
            <ReactCodeMirror
                value={code}
                height="360px"
                extensions={[java()]}
                theme={oneDark}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLine: true,
                    autocompletion: true,
                    syntaxHighlighting: true,
                }}
                onChange={(value) => setCode(value)}
                style={{
                    borderRadius: "0 0 8px 8px",
                    fontFamily: '"Google Sans Code", monospace',
                    fontSize: 14,
                    height: 400,
                }}
            />

            <div className="position-absolute bottom-0 end-0 p-2 d-flex gap-2">
                <Button
                    variant="outline-success"
                    disabled={loading || finalLoading}
                    onClick={handleCheck}
                    className="d-flex align-items-center gap-2 border-success"
                >
                    <BugPlay size={16}/>&nbsp;
                    {loading ? (
                        <>
                            <Loader2 className="spin" size={18}/> Tekshirilmoqda...
                        </>
                    ) : (
                        "Tekshirish"
                    )}
                </Button>

                <Button
                    className={'border-success'}
                    variant="success"
                    color={"success"}
                    disabled={loading || finalLoading}
                    onClick={handleRun}
                >
                    <PlayIcon size={16}/>&nbsp;
                    {finalLoading ? (
                        <>
                            <Loader2 className="spin" size={18}/> Yurgazilmoqda...
                        </>
                    ) : (
                        "Kodni yurgazish"
                    )}
                </Button>
                <TestResultModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    results={[
                        {method: 'helloName("Bob")', expected: 'Hello Bob!', result: 'Hello Bob!', status: 'OK'},
                        {method: 'helloName("Alice") ', expected: 'Hello Alice!', result: 'Hello Alice!', status: 'OK'},
                        {method: 'helloName("Z") ', expected: 'Hello Z!', result: 'Hello X!', status: 'OK'},
                    ]}
                />
            </div>

            <style>
                {`
          .spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </>
    );
}

// export default CodeEditor;


function MarkdownRenderer() {
    // Masala haqida markdown tavsif
    // TODO: Buni alohida fayldan yuklash kerak yoki local dbdan
    const sourceDescription = `
### 🧩 Masala: **stringE**

**Daraja:** Oson  
**Turi:** String manipulation

---

Berilgan **satrda 'e' harfi** necha marta uchrashini hisoblang.  
Agar u **1 martadan kam bo‘lmasa** va **3 martadan ko‘p bo‘lmasa**,  
funksiya **true** qiymat qaytarsin. Aks holda **false**.

---

### 🧠 Namuna kirish/chiqish:
| Kirish | Chiqish | Izoh |
|:-------|:---------|:------|
| \`stringE("Hello")\` | \`true\` | 1 ta 'e' bor |
| \`stringE("Heelle")\` | \`true\` | 3 ta 'e' bor |
| \`stringE("Heelele")\` | \`false\` | 4 ta 'e' bor |

---

### 💡 Eslatma:
- Sizga **String** turi beriladi.
- Belgilarni \`for\` sikli orqali tekshirib chiqish kerak.
- Faqat kichik **'e'** harfini hisoblang.

---

### 🧰 Namunaviy kod:
\`\`\`java showLineNumbers
public boolean stringE(String str) {
    int count = 0;
    for (int i = 0; i < str.length(); i++) {
        if (str.charAt(i) == 'e') {
            count++;
        }
    }
    return count >= 1 && count <= 3;
}
\`\`\`
`;

    return (
        <MarkdownPreview
            source={sourceDescription}
            disableCopy={false}
            className={'rounded-top-0'}
            style={{
                padding: 16,
                height: 400,
                backgroundColor: "#1e1e1e",
                overflow: "auto",
                color: "#f8f8f2",
                borderRadius: 8,
            }}
        />
    );
}

// @ts-ignore
const MarkdownResultRenderer = ({results}) => {
    const allPassed = results.every((r: { status: string; }) => r.status === "OK");

    // Markdown jadvalini yasaymiz
    const header = `| 🧩 ID | Method | Kutilgan | Natijangiz | Holat |`;
    const divider = `|:--|:--|:--|:--|:--|`;

    const rows = results
        .map(
            (r: { method: any; expected: any; result: any; status: "OK" | "FAIL"; }, i: number) =>
                `| ${i + 1} | \`${r.method}\` | \`${r.expected}\` | \`${r.result}\` | ${
                    r.status === "OK" ? "✅" : "❌"
                } |`
        )
        .join("\n");

    const summary = allPassed
        ? `
💚 **All Correct!**

Good job — problem solved perfectly 🎉
`
        : `
❤️ **Some Tests Failed**

Check your logic and try again 🔁
`;

    const markdown = `
<style>
table {
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
}
th, td {
  border: 1px solid #444;
  padding: 6px 10px;
}
th {
  background: #333;
  color: #fff;
}
td {
  background: #222;
  color: #ddd;
}
tr:nth-child(even) td {
  background: #282828;
}
</style>

${header}
${divider}
${rows}

---

${summary}
`;

    return (
        <MarkdownPreview
            source={markdown}
            disableCopy={false}
            className="rounded-top-0 shadow"
            style={{
                padding: 16,
                backgroundColor: "#1e1e1e",
                color: "#f8f8f2",
                borderRadius: 8,
                height: 400,
                overflow: "auto",
                fontFamily: "JetBrains Mono, monospace",
            }}
        />
    );
};

