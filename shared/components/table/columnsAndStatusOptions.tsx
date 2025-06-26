export const baseColumns = [
  { name: "ID", uid: "id" },
  { name: "NOMBRE DE ALABANZA", uid: "name" },
  { name: "USUARIO", uid: "user", sortable: true },
  { name: "URL", uid: "linkSong" },
  { name: "CATEGORIA", uid: "category", sortable: true },
  { name: "LETRA", uid: "fileSong" },
  { name: "ACORDE", uid: "fileScore" },
  { name: "ACCION", uid: "actions" },
  { name: "ESTADO", uid: "status" },
];

export const columnTitlesPresets: Record<string, Record<string, string>> = {
  mySongsTitle: {
    id: "ID",
    name: "NOMBRE DE CANCIÓN",
    user: "USUARIO",
    linkSong: "URL",
    category: "CATEGORIA",
    fileSong: "LETRA",
    fileScore: "ACORDE",
    actions: "ACCIÓN",
  },
  allSongsTitle: {
    id: "ID",
    name: "NOMBRE DE CANCIÓN",
    user: "USUARIO",
    linkSong: "URL",
    category: "CATEGORIA",
    fileSong: "LETRA",
    fileScore: "ACORDE",
  },
  myPlayListsTitle: {
    id: "ID",
    name: "NOMBRE DE LA PLAYLISTS",
    user: "USUARIO",
    fileSong: "LETRAS",
    fileScore: "ACORDES",
    actions: "ACCIÓN",
    status: "ESTADO",
  },
  allPlayListsTitle: {
    id: "ID",
    name: "NOMBRE DE LA PLAYLISTS",
    user: "CREADOR DE LA PLAYLIST",
    fileSong: "LETRAS",
    fileScore: "ACORDES",
  },
};

export const statusOptions = [
  { name: "Activa", uid: "activa" },
  { name: "Inactiva", uid: "inactiva" },
];
