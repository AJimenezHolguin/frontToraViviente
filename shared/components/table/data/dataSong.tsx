import { TableProps } from "../types";
import { IoLogoYoutube, IoPersonOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { COLORSTEXT } from "../../../styles/colors";

export enum CategoryProps {
  ALABANZA = "Alabanza",
  ADORACION = "Adoración",
  HEBREA_MESIANICA = "Hebrea/Mesiánica",
  INFANTILES = "Infantiles",
  INSTRUMENTALES = "Instrumentales",
}

export const dataSongs: TableProps[] = [
  {
    id: 1,
    name: "Shabbat shalom",
    url: (
      <a
        href="https://www.youtube.com/watch?v=l4eQdYVf2B0"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.HEBREA_MESIANICA,
    status: "activa",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
  {
    id: 2,
    name: "Hine ma tov",
    url: (
      <a
        href="https://www.youtube.com/watch?v=U3qyr-8PMXc"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.HEBREA_MESIANICA,
    status: "inactiva",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
  {
    id: 3,
    name: "Fiesta en el desierto",
    url: (
      <a
        href="https://www.youtube.com/watch?v=hk2kzCj1L6w"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.ALABANZA,
    status: "activa",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
  {
    id: 4,
    name: "El todo poderoso",
    url: (
      <a
        href="https://www.youtube.com/watch?v=V3PJqCRpeTo"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.ALABANZA,
    status: "activa",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
  {
    id: 5,
    name: "hashem melej",
    url: (
      <a
        href="https://www.youtube.com/watch?v=PNa2qI_2BGk"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.HEBREA_MESIANICA,
    status: "inactiva",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
  {
    id: 6,
    name: "Derramo el perfume",
    url: (
      <a
        href="https://www.youtube.com/watch?v=aC4M4SxJexg"
        rel="noopener noreferrer"
        target="_blank"
      >
        <IoLogoYoutube color="red" size={20} />
      </a>
    ),
    category: CategoryProps.ADORACION,
    status: "inactiva",
    letter: <FaRegFilePdf size={20} />,
    chord: <FaFilePdf color={COLORSTEXT.primary} size={20} />,
  },
];
