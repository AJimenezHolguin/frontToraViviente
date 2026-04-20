import axiosInstance from "@/config/axios/axiosInstance";

export const getNextMovementNumReg = async (): Promise<number> => {
  try {
    const response = await axiosInstance.get("/movements/next-num-reg");
    
    return response.data.nextNumReg;
  } catch (error) {
    console.error("Error fetching next numReg:", error);
    throw new Error("No se pudo obtener el número de registro");
  }
};