import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

  export interface TableProps {
    id: number;
    name: string;
    url: JSX.Element;
    category: string;
    status: string;
    letter: JSX.Element;
    chord: JSX.Element;
  }