// import axiosInstance from "@/config/axios/axiosInstance";

// import { Song } from "@/types/SongsTypesProps";

// import { getSession } from "next-auth/react";

// export const getAllMySongs = async (): Promise<Song[]> => {
//   try {
//     const session = await getSession();

//     if (!session || !session.user?.token) {
//       throw new Error("Sesión no válida o token faltante");
//     }

   
//     const token = session.user.token;

//     const response = await axiosInstance.get("/songs/user?page=1&take=2&order=ASC", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data.data.map((song: Song) => ({
//       _id: song._id,
//       name: song.name,
//       user: song.user,
//       linkSong: song.linkSong,
//       category: song.category,
//       fileSong: song.fileSong,
//       fileScore: song.fileScore,
//     }));
//   } catch (error: any) {
//     console.error(
//       "Error fetching songs:",
//       error?.response?.data || error.message
//     );
//     throw Error("No se pudieron obtener las canciones");
//   }
// };


import axiosInstance from "@/config/axios/axiosInstance";
import { getSession } from "next-auth/react";
import { GetAllMySongsResponse, GetAllSongsParamsProps } from "../typesServices";

export const getAllMySongs = async ({
page = 1,
take = 10,
order  = "ASC",
search = "",
}:GetAllSongsParamsProps
): Promise<GetAllMySongsResponse> => {
  try {
    const session = await getSession();

    if (!session || !session.user?.token) {
      throw new Error("Sesión no válida o token faltante");
    }
    const token = session.user.token;

    const response = await axiosInstance.get("/songs/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        take,
        order,
        search,
      },
    });

    return {
      songs: response.data.data,
      metadata: response.data.metadata,
    };
    }  catch (error: any) {
      console.error("Error fetching songs:", error?.response?.data || error.message);
    throw new Error("No se pudieron obtener las canciones");
    }
};