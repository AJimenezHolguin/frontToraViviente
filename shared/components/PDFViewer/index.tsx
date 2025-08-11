import { COLORS } from "@/styles/colors";
import { PDFViewerProps } from "@/types/PlaylistsTypesProps";
import { PiScreencast } from "react-icons/pi";
import { Text } from "@/shared/components/Text";

export const PDFViewer = ({ selected, songs, setSelected }: PDFViewerProps) => {
  if (!selected) {
    return <div className="p-4">Selecciona una canción para visualizar.</div>;
  }

  const currentIndex = songs.findIndex(
    (song) => song.file.public_id === selected.public_id
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelected(songs[currentIndex - 1].file);
    }
  };

  const handleNext = () => {
    if (currentIndex < songs.length - 1) {
      setSelected(songs[currentIndex + 1].file);
    }
  };

  return (
    <>
      <div className="py-0.5 px-2  flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className={`px-2 py-1 rounded transition-opacity ${
              currentIndex === 0
                ? "bg-gray-200 opacity-50 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            <Text 
            $color={COLORS.primary} 
            $ta="center"
             $v="md"
            >
            Atrás
            </Text>
          </button>
          
          <button
            className={`px-2 py-1 rounded transition-opacity ${
              currentIndex === songs.length - 1
                ? "bg-gray-200 opacity-50 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentIndex === songs.length - 1}
            onClick={handleNext}
          >
            <Text 
            $color={COLORS.primary} 
            $ta="center"
            $v="md"
            >
            Siguiente
            </Text>
          </button>
            
        </div>
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
