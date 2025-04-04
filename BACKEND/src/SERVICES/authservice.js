import bcrypt from 'bcrypt';
const saltRounds = 10;


const hashPassword = async (password) => {
    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Erro ao criptografar a senha:', err);
        throw new Error('Erro ao criptografar a senha');
    }
};


const comparePasswords = async (password, hashedPassword) => {
    try {

        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        console.error('Erro ao comparar a senha:', err);
        throw new Error('Erro ao comparar a senha');
    }
};

export { hashPassword, comparePasswords };