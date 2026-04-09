import { createMovement } from "@/services/movements/createMovement.service";
import { CreateMovementRequest, CreateMovementResponse } from "@/services/typesServices";


export const createMovementHandler = async (
  form: CreateMovementRequest
): Promise<CreateMovementResponse> => {
  try {
    const response = await createMovement(form);

    return response;
  } catch (error: any) {
    throw new Error(error?.message || "Error al crear el asiento contable");
  }
};
