export const formatCurrency = (
    value: number,
    currency: string = "COP",
    locale: string = "es-CO"
  ) => {
    if (value === null || value === undefined) return "";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };