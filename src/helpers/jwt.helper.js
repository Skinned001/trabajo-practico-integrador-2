import jwt from "jsonwebtoken";

//Generación y validación de tokens//

export const generateToken = (user) => {
  try {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      first_name: user.profile.firstName,
      last_name: user.profile.lastName,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    throw new Error("Error al generar el token: " + error);
  }
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error al verificar el token:" + error);
  }
};