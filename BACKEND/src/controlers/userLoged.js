import db from "../models/db.js";

const getUserProfile = async (req, res) => {
    const { id } = req.user;

    try {
        db.query(
            "SELECT nome, email FROM usuarios WHERE id = ?",
            [id],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Erro no servidor" });
                }
                if (result.length === 0) {
                    return res.status(404).json({ message: "Usuário não encontrado" });
                }
                const { nome, email } = result[0];
                return res.status(200).json({ nome: nome, email: email, id: id });
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no servidor" });
    }
};

export default getUserProfile;
