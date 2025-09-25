import bcrypt from "bcrypt";

//hash de contraseña 
export const hashPassword = async (password) => {
    const saltRounds = 10; // 10 es el recomendado
    return await bcrypt.hash(password, saltRounds);
};

//verificar la contraseña
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};