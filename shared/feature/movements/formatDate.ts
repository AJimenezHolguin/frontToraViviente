export const formatDate = (date: string) => {
    if(!date) return "";
  
    const [year, month, day] = date.split("-");
  
    const localDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  
    return new Intl.DateTimeFormat("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(localDate);
  };