import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './succes.module.css';

interface props {
    value: string
    where: string
}

function SuccessModal(p: props) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (p.where == "main")
                window.location.href = `/${p.where}`
            else
                navigate(`/${p.where}`);
        }, Number(3000));
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <p className={styles.overlay}>
            <p className={styles.modal}>
                <h2>{p.value}</h2>
                <p className={styles.loadingline}>
                    <p className={styles.loadingbar}></p>
                </p>
            </p>
        </p>
    );
};

export default SuccessModal;
