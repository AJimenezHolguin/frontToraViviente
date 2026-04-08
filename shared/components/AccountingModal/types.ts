export interface MovementFormState {
    date: string;
    description: string;
    type: "ingreso" | "gasto";
    monto: string;
  }