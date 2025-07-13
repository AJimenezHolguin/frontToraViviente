// components/PlaylistPDFViewer/PlaylistSidebar.tsx
import { FaFilePdf } from "react-icons/fa6";
import { IoChevronUp, IoChevronDown, IoLogoYoutube } from "react-icons/io5";
import { Text } from "../Text";
import { COLORS } from "@/styles/colors";
import { WrapperSubTitle } from "../WrapperSubTitle";
import { PlaylistSidebarProps } from "@/types/PlaylistsTypesProps";

export const PlaylistSidebar = ({
  songs,
  selected,
  setSelected,
  moveItem,
  isSidebarOpen,
  toggleSidebar,
  playlistName,
}: PlaylistSidebarProps) => {
  return (
    <div
      className={`transition-all duration-300 bg-white border-r flex flex-col ${
        isSidebarOpen ? "w-3/4" : "w-10"
      } overflow-hidden min-w-0`}
    >
      <div className="flex justify-between items-start p-4">
        {isSidebarOpen ? (
          <>
            <Text $color={COLORS.primary} $ta="left" $v="h4" className="pl-1">
              {playlistName
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
            </Text>
            <button
              className="text-xl font-bold"
              title="Ocultar"
              onClick={toggleSidebar}
            >
              &lt;
            </button>
          </>
        ) : (
          <button
            className="text-xl font-bold"
            title="Mostrar lista"
            onClick={toggleSidebar}
          >
            &gt;
          </button>
        )}
      </div>

      {isSidebarOpen && (
        <div className="w-[600px] flex-1 p-4 overflow-y-auto h-full ">
          <WrapperSubTitle title="Letras: ">
            <ul className="flex flex-col pt-6">
              {songs.map((song, index) => (
                <button
                  key={song._id}
                  className={`cursor-pointer w-full text-left p-2 rounded-md flex items-center gap-2 hover:bg-gray-100 ${
                    selected?.public_id === song.file.public_id
                      ? "bg-gray-200"
                      : ""
                  }`}
                  onClick={() => setSelected(song.file)}
                >
                  <FaFilePdf className="text-secondary" size={20} />
                  <span className="block w-full break-words">
                    {song.title.charAt(0).toUpperCase() + song.title.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      className="text-gray-600 hover:text-black disabled:opacity-30"
                      disabled={index === 0}
                      title="Mover arriba"
                      onClick= {() => moveItem(index, index - 1) }
                    >
                      <IoChevronUp className={index === 0 ? "opacity-30" : ""} size={20} />
                    </button>

                    <button
                      className="text-gray-600 hover:text-black disabled:opacity-30"
                      disabled={index === songs.length - 1}
                      title="Mover abajo"
                      onClick= {() => moveItem(index, index + 1) }
                    >
                      <IoChevronDown 
                       className={index === songs.length - 1 ? "opacity-30" : "" }
                      size={20} 
                      />
                    </button>
                  </div>
                  <a
                    href={song.linkSong}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <IoLogoYoutube color="red" size={20} title="Youtube" />
                  </a>
                </button>
              ))}
            </ul>
          </WrapperSubTitle>
        </div>
      )}
    </div>
  );
};
