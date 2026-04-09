import { annulledMovement } from "@/services/movements/annulledMovement.service";
import { AlertType } from "@/shared/components/Modal/types";
import { Movements } from "@/types/movementsTypesProps";
import { useState } from "react";

export const useDeleteMovement = (
    showAlert:(type:AlertType, message: string) => void    
) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async(movement: Movements, description:string) => {
        try {
            setLoading(true);
            await annulledMovement(
                movement.id,
                description
            )
            showAlert("success", "Registro contable anulado correctamente!");
        } catch (error) {
            showAlert("error", "Error al anular el registro contable!");
        } finally {
            setLoading(false);
        }
    };

    return {handleDelete, loading}
} 