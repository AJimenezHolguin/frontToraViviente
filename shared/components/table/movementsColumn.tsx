import { Movements } from "@/types/movementsTypesProps";
import { formatCurrency } from "../../utils/formatCurrency";
import { TableColumnType } from "./types";

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
        <span >{item.numReg}</span>
      </div>
  ),
  },
  {
    uid: "date",
    name: "FECHA",
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
    render: (item: Movements) => <span>{item.type}</span>,
  },
  {
    uid: "ingreso",
    name: "INGRESO",
    render: (item: Movements) => <span>{formatCurrency(item.ingreso)}</span>,
  },
  {
    uid: "gasto",
    name: "GASTO",
    render: (item: Movements) => <span>{formatCurrency(item.gasto)}</span>,
  },
  {
    uid: "state",
    name: "ESTADO",
    render: (item: Movements) => <span>{item.state}</span>,
  },
  {
    uid: "user",
    name: "USUARIO",
    render: (item: Movements) => <span>{item.user_name}</span>,
  },
  {
    uid: "saldo",
    name: "SALDO",
    render: (item: Movements) => <span>{formatCurrency(item.saldo)}</span>,
  },
];
