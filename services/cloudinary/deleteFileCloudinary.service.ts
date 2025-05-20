export const deleteImage = async (publicId: string) => {
    console.log("este es el publicId", publicId);
    try {
      const res = await fetch('/api/cloudinaryDeleteImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_id: publicId }),
      });
  
      const data = await res.json();
      
      if (res.status === 404) {
        console.warn(`Imagen no encontrada en Cloudinary: ${publicId}`);
      } else if (!res.ok) {
        console.error(`Error al eliminar imagen ${publicId}:`, data.error || data);
      } else {
        console.log(`Imagen eliminada correctamente:`, data);
      }
    } catch (error) {
      console.error('Fallo al intentar eliminar la imagen:', error);
    }
  };