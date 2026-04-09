import axiosInstance from "@/config/axios/axiosInstance";
import { Movements } from "@/types/movementsTypesProps";

export const getMovementById = async (id: string): Promise<Movements> => {
  try {
    const response = await axiosInstance.get(`/movements/${id}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching movement by ID:", error);
    throw new Error("No se pudo obtener el asiento contable por ID");
  }
};
