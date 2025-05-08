import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
  };

  export interface Song {
    _id: string;
    name: string;
    user?: {
      _id: string;
      name: string;
      email: string;
    };
    linkSong: string;
    category: string;
    status?: string;
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

  export interface SongsResponse {
    success: boolean;
    count: number;
    data: Song[];
  }