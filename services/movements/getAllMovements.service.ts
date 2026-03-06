import { getSession } from 'next-auth/react';
import { PaginationParamsProps, GetAllMovementsResponse } from '../typesServices';
import { DEFAULT_PAGINATION } from '../defaultPagination';
import axiosInstance from '@/config/axios/axiosInstance';

export const getAllMovements = async (
    params: PaginationParamsProps
):Promise<GetAllMovementsResponse> => {
    try {
        const session = await getSession();
        
        if(!session || !session.user?.token){
            throw new Error("Sesión no válida o token faltante");
        }

        const finalParams = { DEFAULT_PAGINATION, ...params };

        const response = await axiosInstance.get<GetAllMovementsResponse>(
            "/movements",  
            {
        params: finalParams,
            }
    );

    return response.data;

    } catch (error: any) {
        console.error(
            "Error fetching movements:",
            error?.response?.data || error.message
          );
          throw new Error("No se pudieron obtener las canciones"); 
    }
}