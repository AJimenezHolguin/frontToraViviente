import { getSession } from 'next-auth/react';


import axiosInstance from '@/config/axios/axiosInstance';
import { GetAllMovementsResponse, PaginationParamsProps } from '../typesServices';
import { DEFAULT_PAGINATION } from '../defaultPagination';

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
     
        console.log("RESPONSE:", response);
        
    return response.data;

    } catch (error: any) {
        console.log("ERROR STATUS:", error?.response?.status);
        console.error(
            "Error fetching movements:",
            error?.response?.data || error.message
          );
          throw new Error("No se pudieron obtener las canciones"); 
    }
}