import db from '../models/db.js';

const listarMensagens = (req, res) => {
    const { chat_id } = req.params;
    const id = req.user; 

    if (!id) {
        return res.status(400).json({ mensagem: 'Usuário não autenticado.' });
    }

    // Consultar as mensagens do chat
    const query = `
        SELECT m.id, m.chat_id, m.remetente_id, m.conteudo, m.created_at,
               u1.nome AS remetente_nome
        FROM mensagens m
        JOIN usuarios u1 ON u1.id = m.remetente_id
        WHERE m.chat_id = ?
        ORDER BY m.created_at ASC
    `;

    const values = [chat_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ mensagem: 'Erro ao listar as mensagens.' });
        }

        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma mensagem encontrada para este chat.' });
        }

        // Diferenciar as mensagens como 'logado' e 'naoLogado'
        const mensagens = result.map(mensagem => {
            return {
                id: mensagem.id,
                chat_id: mensagem.chat_id,
                conteudo: mensagem.conteudo,
                created_at: mensagem.created_at,
                remetente_nome: mensagem.remetente_nome,
                tipo: mensagem.remetente_id === id ? 'logado' : 'naoLogado'
            };
        });

        // Retornar as mensagens
        return res.status(200).json({
            chat_id: chat_id,
            mensagens: mensagens
        });
    });
};

export default listarMensagens;
