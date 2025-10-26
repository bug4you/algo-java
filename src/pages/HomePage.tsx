import {Link} from "react-router";
import {Card, CardBody, Col, Container, Row} from "reactstrap";

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

export default function HomePage() {
    return (
        <Container fluid className={"bg-body"}>
            <Container className={'bg-body'}>
                <h1 className={"aref-ruqaa-700"}>AlgoJava</h1>
                <hr/>
                <Row>
                    {
                        categories.map(category => <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            level={category.level}
                            total={category.total}
                            progress={category.progress}
                        />)
                    }
                </Row>
            </Container>
        </Container>
    );
}

const CategoryCard = ({ id, name, level, total, progress }: { id: number; name: string; level: string; total: number; progress: number }) => {
    return (
        <Col lg={3} md={4} sm={6} xs={12}>
            <Card className={'mb-4 bg-dark border-dark shadow google-sans-code'}>
                <CardBody>
                    <p>{name}</p>
                    <p style={{fontSize: 14}}>Daraja: {level}</p>
                    <p style={{fontSize: 14}}>Masalalar soni: {total}</p>
                    <div className="d-flex align-items-center mb-2">
                        <div className="progress flex-grow-1" role="status" aria-label="Loading">
                            <div className="progress-bar placeholder-wave" style={{width: `${progress / total * 100}%`}}></div>
                        </div>
                        <div className="flex-shrink-0 ms-1">
                            {progress / total * 100}%
                        </div>
                    </div>
                    <Link to={`/category/${id}`} className={`btn btn-${progress > 0 ? 'success' : 'primary'} w-100`}>
                        {progress > 0 ? "Davom ettirish" : "Boshlash"}
                    </Link>
                </CardBody>
            </Card>
        </Col>
    );
};
