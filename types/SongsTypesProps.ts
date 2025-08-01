import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

  export interface Song {
    _id: string;
    name: string;
    userName: string  
    linkSong: string;
    category: string;
    fileSong: {
      public_id: string;
      secure_url: string;
    };
    fileScore: {
      public_id: string;
      secure_url: string;
    };
    __v?: number
  }

