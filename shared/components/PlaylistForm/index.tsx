import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { PlaylistFormProps } from "./types";
import { SwitchComponent } from "../Switch";

export const PlaylistForm: React.FC<PlaylistFormProps> = ({
  form,
  setForm,
  filterValue,
  responseData,
  filterAllSongs,
  handleScroll,
}) => {
  return (
    <>
      <p className="text-sm font-medium mb-2">Canciones disponibles:</p>

      <div
        className="h-[200px] overflow-y-auto border rounded-md px-2"
        onScroll={handleScroll}
      >
        <CheckboxGroup
          value={form.songs}
          onChange={(val) => setForm({ ...form, songs: val })}
        >
          <div className="flex flex-col gap-1 py-2">
            {filterAllSongs.map((song) => (
              <Checkbox key={song._id} value={song._id}>
                {song.name}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* SELECCIONADOS */}
      {form.songs.length > 0 && (
        <div className="mt-4 overflow-y-scroll" style={{ height: "100px" }}>
          <p className="text-sm font-medium mb-1">Canciones seleccionadas:</p>
          <div className="gap-1 pr-1">
            {form.songs
              .map((id) => responseData.find((song) => song._id === id))
              .filter(Boolean)
              .map((song) => (
                <div
                  key={song!._id}
                  className="bg-primary/10 rounded-lg px-2 py-1 text-xs text-center text-secondary font-medium flex justify-between items-center gap-2"
                >
                  <span className="truncate">{song!.name}</span>
                  <button
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                    title="Quitar"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        songs: prev.songs.filter((sid) => sid !== song!._id),
                      }))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex mt-2">
        <SwitchComponent
          isSelected={form.status}
          onChange={(val) => setForm({ ...form, status: val })}
        />
        <p
          className="text-md font-medium mb-2 pt-2 text-primary"
          style={{ paddingLeft: "5px" }}
        >
          ¿Playlist visible?
        </p>
      </div>
    </>
  );
};