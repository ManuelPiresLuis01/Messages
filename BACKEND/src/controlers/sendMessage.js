import db from '../models/db.js';  // Importando a conexão

const sendMessage = (req, res) => {
    const { chat_id } = req.params; 
    const { remetente_id, conteudo } = req.body;

    if (!chat_id || !remetente_id || !conteudo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO mensagens (chat_id, remetente_id, conteudo) VALUES (?, ?, ?)';
    const values = [chat_id, remetente_id, conteudo];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao enviar a mensagem.' });
        }
        
        return res.status(201).json({
            mensagem: 'Mensagem enviada com sucesso!',
            id_mensagem: result.insertId
        });
    });
};

export default sendMessage;
