if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL no está configurado.");
}

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const HTTP_STATUS = {
  NOT_TOKEN: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
};
