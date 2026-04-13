import { createMovement } from "@/services/movements/createMovement.service";
import { adjustMovement } from "@/services/movements/adjustMovement.service";
import { Movements } from "@/types/movementsTypesProps";
import {
 
  ApiResponse,
  CreateMovementRequest,
  
} from "@/services/typesServices";

type SaveMovementProps = {
  form: CreateMovementRequest;
  recordToEdit?: Movements | null;
};

export const saveMovementHandler = async ({
  form,
  recordToEdit,
}: SaveMovementProps): Promise<ApiResponse<Movements>> => {

  if (recordToEdit) {
    return await adjustMovement(recordToEdit.id, {
      type: form.type,
      monto: form.monto,
      description: form.description,
    });
  }

  return await createMovement(form);
};