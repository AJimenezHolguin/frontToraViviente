export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("esta es la respuesta del servicio:", response);
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Error en la autenticación");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en authService:", error);
    throw error; // Se relanza el error para que sea manejado en las actions o el componente
  }
};
