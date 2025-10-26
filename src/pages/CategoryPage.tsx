import {Link, useNavigate, useParams} from "react-router";
import {Button, Card, CardBody, Col, Container, Row} from "reactstrap";

const categories = [
    { id: 1, name: "Aralash masalalar - 1", level: "Oson", total: 20, progress: 12 },
    { id: 2, name: "String - 1", level: "Oson", total: 30, progress: 0 },
    { id: 3, name: "Array - 1", level: "Oson", total: 25, progress: 0 },
    { id: 4, name: "Logic - 1", level: "Oson", total: 15, progress: 0 },
    { id: 5, name: "Aralash masalalar - 2", level: "O‘rtacha", total: 20, progress: 0 },
    { id: 6, name: "String - 2", level: "O‘rtacha", total: 30, progress: 0 },
    { id: 7, name: "Array - 2", level: "O‘rtacha", total: 25, progress: 0 },
    { id: 8, name: "Logic - 2", level: "O‘rtacha", total: 15, progress: 0 },
    { id: 9, name: "Aralash masalalar - 3", level: "Qiyin", total: 20, progress: 0 },
    { id: 10, name: "String - 3", level: "Qiyin", total: 30, progress: 0 },
    { id: 11, name: "Array - 3", level: "Qiyin", total: 25, progress: 0 },
    { id: 12, name: "Logic - 3", level: "Qiyin", total: 15, progress: 0 },
];

const problems = [
    { id: 1, title: "stringE", level: "Oson", completed: true },
    { id: 2, title: "firstLast6", level: "Oson", completed: false },
    { id: 3, title: "noTriples", level: "O‘rtacha", completed: false },
    { id: 4, title: "has22", level: "Qiyin", completed: false },
    { id: 5, title: "countYZ", level: "Oson", completed: true },
    { id: 6, title: "endOther", level: "O‘rtacha", completed: false },
    { id: 7, title: "starOut", level: "Qiyin", completed: false },
    { id: 8, title: "withoutX", level: "Oson", completed: true },
];

export default function CategoryPage() {
    const { categoryId } = useParams();
    const navigateToHome = useNavigate();

    const onBackButtonPressed = () => navigateToHome("/home", { replace: false });

    return (
        <Container fluid className={"bg-body google-sans-code"}>
            <Container className={'bg-body'}>
                <h1 className={"aref-ruqaa-700"}>AlgoJava</h1>
                <hr/>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <div className={'fs-4 fw-medium text-white'}>
                        {categories.find(cat => cat.id.toString() === categoryId)?.name}
                    </div>
                    <Button onClick={onBackButtonPressed}>Bosh sahifa</Button>
                </div>
                {/*<div className={'text-muted mb-4'}>Daraja: Oson | Masalalar soni: 30 | Yechilgan masalalar: 0</div>*/}
                <div className={'text-muted mb-4'}>
                    Daraja: {categories.find(cat => cat.id.toString() === categoryId)?.level} | Masalalar soni: {categories.find(cat => cat.id.toString() === categoryId)?.total} | Yechilgan masalalar: {categories.find(cat => cat.id.toString() === categoryId)?.progress}
                </div>
                <Row>
                    {
                        problems.map(problem => <ProblemCard
                            key={problem.id}
                            id={problem.id}
                            title={problem.title}
                            level={problem.level}
                            completed={problem.completed}
                        />)
                    }
                </Row>
            </Container>
        </Container>
    );
}

const ProblemCard = ({ id, title, completed }: { id: number; title: string; level?: string; completed: boolean }) => {
    return (
        <Col lg={3} md={4} sm={6} xs={12} className={'mb-4'}>
            <Link to={`/problem/${id}`} className={'text-decoration-none'}>
                <Card className={'bg-dark border-dark shadow google-sans-code'}>
                    <CardBody>
                        <div className={'d-flex align-items-center justify-content-between'}>
                            <p className={'m-0'}>{title}</p>
                            <p className={'m-0'}>
                                {
                                    completed ? ("✅") : ("❌")
                                }
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    );
}
