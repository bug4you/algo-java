import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <div className="content-wrapper d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h1 className="display-2 fw-bold mb-10">404</h1>
            <p className="text-muted mb-20">Sahifa topilmadi</p>
            <Link to="/home" className="btn btn-primary">
                Bosh sahifaga qaytish
            </Link>
        </div>
    );
}
