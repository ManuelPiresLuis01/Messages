import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./splash.module.css";
import logo from "../../../../public/logo_on_black_bg.png"; // ajuste o caminho conforme a pasta

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="Mensagens logo" className={styles.logo} />
    </div>
  );
};

export default SplashScreen;
