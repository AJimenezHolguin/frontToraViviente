import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

  export interface Song {
    _id: string;
    name: string;
    user?: {
      _id: string;
      email: string;
    };
    linkSong: string;
    category: string;
    status?: string;
    fileSong: string;
    fileScore: string;
    __v?: number
  }

  export interface SongsResponse {
    success: boolean;
    count: number;
    data: Song[];
  }