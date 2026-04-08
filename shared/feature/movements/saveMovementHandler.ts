import { CreateMovementRequest, CreateMovementResponse } from "@/services/typesServices";
import { Movements } from "@/types/movementsTypesProps";
import { createMovementHandler } from "./createMovementHandler";
import { adjustMovementHandler } from './adjustMovementHandler';


type SaveMovementProps = {
  form: CreateMovementRequest;
  recordToEdit?: Movements | null;
};

export const saveMovementHandler = async ({
  form,
  recordToEdit,
}: SaveMovementProps): Promise<CreateMovementResponse> => {
  
  if (recordToEdit) {
    return await adjustMovementHandler(recordToEdit.id, form);
  }

  return await createMovementHandler(form);
};