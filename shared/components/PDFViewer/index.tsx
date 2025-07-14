// components/PlaylistPDFViewer/PDFViewer.tsx

import { PDFViewerProps } from "@/types/PlaylistsTypesProps";
import { PiScreencast } from "react-icons/pi";

export const PDFViewer = ({ selected }: PDFViewerProps) => {
  if (!selected) {
    return <div className="p-4">Selecciona una canción para visualizar.</div>;
  }

  return (
    <>
      <div className="p-2 flex justify-end items-center">
        <a
          href={selected.secure_url}
          rel="noopener noreferrer"
          target="_blank"
          title="Ver en pantalla completa"
        >
          <PiScreencast size={20} />
        </a>
      </div>
      <iframe
        className="w-full h-full sidebar-scroll-viewerpdf"
        src={selected.secure_url}
        title={selected.public_id}
      />
    </>
  );
};
