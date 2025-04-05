import db from '../models/db.js';  // Importando a conexão

const sendMessage = (req, res) => {
    const { chat_id } = req.params;
    const { id } = req.user;
    const { conteudo } = req.body;

    if (!chat_id || !id || !conteudo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO mensagens (chat_id, remetente_id, conteudo) VALUES (?, ?, ?)';
    const values = [chat_id, id, conteudo];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao enviar a mensagem.' });
        }

        return res.status(201).json({
            mensagem: 'Mensagem enviada com sucesso!',
            remetente: id,
            id_mensagem: result.insertId
        });
    });
};

export default sendMessage;
