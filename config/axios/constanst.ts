// Lanza un error si la variable no está configurada
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL no está configurado.");
}

// Construye la URL base
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Estados HTTP comunes de error
export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Encabezados por defecto
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*", // Ajusta esto según tus necesidades
};
