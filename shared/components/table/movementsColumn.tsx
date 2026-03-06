import { Movements } from "@/types/movementsTypesProps";


export const movementColumns = [
  {
    uid: "date",
    name: "Fecha",
    sortable: true,
    render: (item: Movements) => <span>{item.date}</span>,
  },
  {
    uid: "numReg",
    name: "Num Reg",
    sortable: true,
    render: (item: Movements) => <span>{item.numReg}</span>,
  },
  {
    uid: "description",
    name: "Descripción",
    sortable: true,
    render: (item: Movements) => <span>{item.description}</span>,
  },
  {
    uid: "type",
    name: "Tipo",
    sortable: true,
    render: (item: Movements) => <span>{item.type}</span>,
  },
  {
    uid: "ingreso",
    name: "Ingreso",
    render: (item: Movements) => <span>{item.ingreso}</span>,
  },
  {
    uid: "gasto",
    name: "Gasto",
    render: (item: Movements) => <span>{item.gasto}</span>,
  },
  {
    uid: "saldo",
    name: "Saldo",
    render: (item: Movements) => <span>{item.saldo}</span>,
  },
];