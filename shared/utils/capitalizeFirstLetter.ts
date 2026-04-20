export const capitalizeFirstLetter = (text: string): string => {
    if (!text) return "";
   
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

 
  export const formatMovementType = (type: string): string => {
    const map: Record<string, string> = {
      ingreso: "Ingreso",
      gasto: "Gasto",
      ajuste: "Ajuste",
      anulacion: "Anulación",
    };
  
    return map[type] || capitalizeFirstLetter(type);
  };