import axiosCloudinary from "@/config/axios/axiosCloudinary";


export const uploadFileToCloudinary = async (
    file: File,
    preset: string 
): Promise <{public_id: string; secure_url: string} | null > => {
   const formData = new FormData();
    
   formData.append("file", file);
    formData.append("upload_preset", preset);

    try {
        const response = await axiosCloudinary.post("/upload", formData, )
        const { public_id, secure_url } = response.data;

        return { public_id, secure_url };
        
    } catch (error) {
        console.error(`Error al subir archivo a Cloudinary [${preset}]:`, error);
        
        return null
    }
}