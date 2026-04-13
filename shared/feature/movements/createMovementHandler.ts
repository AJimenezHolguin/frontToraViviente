import { createMovement } from "@/services/movements/createMovement.service";
import { ApiResponse, CreateMovementRequest,  } from "@/services/typesServices";
import { Movements } from "@/types/movementsTypesProps";


export const createMovementHandler = async (
  form: CreateMovementRequest
): Promise<ApiResponse<Movements>> => {
  try {
    const response = await createMovement(form);

    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Error al crear el asiento contable");
  }
};
