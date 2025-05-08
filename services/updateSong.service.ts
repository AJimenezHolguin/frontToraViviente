
import axios from 'axios';
import { UpdateSongDto } from './typesServices';
import { API_URL } from '@/config/axios/constanst';
import { getSession } from 'next-auth/react';


const api = axios.create({
    baseURL: API_URL,
});

export const updateSong = async (id: string, data: UpdateSongDto) => {
  try {
    const session = await getSession();

    const response = await api.put(`/songs/${id}`, data, {
        headers: {
            Authorization: `Bearer ${session?.user.token}`,
        },
    } );
   
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error actualizando canción');
  }
};