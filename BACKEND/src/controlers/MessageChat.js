import db from '../models/db.js';

const Chat = (req, res) => {
  const { id } = req.user;
  const { receptor } = req.body;

  if (!id|| !receptor) {
    return res.status(400).json({ mensagem: 'IDs dos usuários são obrigatórios.' });
  }

  // Verificar se já existe um chat entre os dois usuários
  const query = `
    SELECT cu.chat_id
    FROM chat_usuarios cu
    WHERE cu.usuario_id IN (?, ?)
    GROUP BY cu.chat_id
    HAVING COUNT(DISTINCT cu.usuario_id) = 2
  `

  db.query(query, [id, receptor], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar chat existente:', err);
      return res.status(500).json({ mensagem: 'Erro ao verificar chat existente.' });
    }

    if (rows.length > 0) {
      // Já existe um chat entre os dois usuários
      return res.status(200).json({
        chat_id: rows[0].chat_id,
        mensagem: 'Chat já existente entre os usuários.',
      });
    }

    // Criar um novo chat
    const createChatQuery = 'INSERT INTO chats () VALUES ()';

    db.query(createChatQuery, (err, result) => {
      if (err) {
        console.error('Erro ao criar o chat:', err);
        return res.status(500).json({ mensagem: 'Erro ao criar o chat.' });
      }

      const chatId = result.insertId;

      // Associar os dois usuários ao novo chat
      const insertUsersQuery = `
        INSERT INTO chat_usuarios (chat_id, usuario_id) 
        VALUES (?, ?), (?, ?)
      `;
      db.query(insertUsersQuery, [chatId, id, chatId, receptor], (err) => {
        if (err) {
          console.error('Erro ao associar usuários ao chat:', err);
          return res.status(500).json({ mensagem: 'Erro ao associar usuários ao chat.' });
        }

        res.status(201).json({
          chat_id: chatId,
          mensagem: 'Novo chat criado com sucesso.',
        });
      });
    });
  });
};

export default Chat;
