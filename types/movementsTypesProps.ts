
export interface Movements {
    id: string;
    date: string;
    numReg: number;
    description: string;
    type: string;
    ingreso: number;
    gasto: number;
    saldo: number;
    state: string;
    user: string;
    ref_id: string;
    user_uuid: string;
    user_name: string;
    user_email: string;
    created_at: string;
    monto?: string;
}