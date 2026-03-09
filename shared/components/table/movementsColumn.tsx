import { Movements } from "@/types/movementsTypesProps";
import { formatCurrency } from "../../utils/formatCurrency";
import { TableColumnType } from "./types";
import { Text } from "@/shared/components/Text";
import { COLORS } from "@/styles/colors";
import { getMovementTypeColor } from "@/styles/movementsTypesStyles";



export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};


export const movementColumns: TableColumnType<Movements>[] = [
  {
    uid: "numReg",
    name: "N° ASIENTO",
    sortable: true,
    render: (item: Movements) => (
      <div className="flex justify-center">
        <Text $fw={700}>
        <span >{item.numReg}</span>
    </Text>  
      </div>
  ),
  },
  {
    uid: "date",
    name: "FECHA",
    align: "center",
    render: (item: Movements) => <span className="whitespace-nowrap">{formatDate(item.date)}</span>,
  },
  {
    uid: "description",
    name: "DESCRIPCIÓN",
    render: (item: Movements) => <span>{item.description}</span>,
  },
  {
    uid: "type",
    name: "TIPO",
    align: "center",
    render: (item: Movements) => {
    const typeStyle = getMovementTypeColor(item.type)
      
    return (
    <Text className={"inline-flex px-2 rounded-lg"} $ta={"center"} $color={typeStyle.$color} $bg={typeStyle.$bg} $fw={500}>
      <span >{item.type}</span>
    </Text>
      )
    }  
  },
  {
    uid: "ingreso",
    name: "INGRESO",
    render: (item: Movements) => (
      <Text $color={COLORS.secondary} $fw={700}>
        {item.ingreso > 0 ? formatCurrency(item.ingreso) : "-"}    
      </Text>
  ),
  },
  {
    uid: "gasto",
    name: "GASTO",
    render: (item: Movements) => (
      <Text $color={COLORS.danger} $fw={700}>
        {item.gasto > 0 ? formatCurrency(item.gasto) : "-"}
      </Text>
  ),
  },
  {
    uid: "state",
    name: "ESTADO",
    render: (item: Movements) => (
    <Text $color={item.state === "activo" ? COLORS.secondary  : COLORS.light_gray} $fw={500}>
      <span>{item.state}</span>
    </Text>
  ),
  },
  {
    uid: "user",
    name: "USUARIO",
    render: (item: Movements) => <span>{item.user_name}</span>,
  },
  {
    uid: "saldo",
    name: "SALDO",
    render: (item: Movements) => (
      <Text $fw={700}>
        <span>{formatCurrency(item.saldo)}</span>
      </Text>
  ),
  },
];
