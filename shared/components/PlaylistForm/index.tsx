import React from "react";
import { InputComponent } from "@/shared/components/Input";
import { VariantProps } from "@/shared/components/Input/types";
import { SearchComponent } from "@/shared/components/Search";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { SwitchComponent } from "@/shared/components/Switch";
import { PlaylistFormProps } from "./types";

export const PlaylistForm: React.FC<PlaylistFormProps> = ({
  form,
  setForm,
  responseData,
  selectedSongs,
  setSelectedSongs,
  filterValue,
  setFilterValue,
  isVisible,
  setIsVisible,
  onScroll,
}) => {
  const filteredSongs = responseData.filter((song) =>
    song.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="px-6 flex flex-col gap-4">
      {/* Nombre de la playlist */}
      <InputComponent
        isClearable
        isRequired
        classNames={{ base: "w-full" }}
        label="Nombre de la playlist"
        placeholder="Nueva playlist..."
        value={form.name}
        variant={VariantProps.UNDERLINED}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {/* Buscador */}
      <SearchComponent
        classNames={{ base: "w-full" }}
        value={filterValue}
        onValueChange={setFilterValue}
      />

      <p className="text-sm font-medium">Canciones disponibles:</p>

      {/* Lista scrollable */}
      <div
        className="h-[200px] overflow-y-auto border rounded-md px-2"
        onScroll={onScroll}
      >
        <CheckboxGroup value={selectedSongs} onChange={setSelectedSongs}>
          <div className="flex flex-col gap-1 py-2">
            {filteredSongs.map((song) => (
              <Checkbox key={song._id} value={song._id}>
                {song.name}
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </div>

      {/* Canciones seleccionadas */}
      {selectedSongs.length > 0 && (
        <div className="mt-4 overflow-y-scroll" style={{ height: "100px" }}>
          <p className="text-sm font-medium mb-1">Canciones seleccionadas:</p>
          <div className="gap-1 pr-1">
            {selectedSongs
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
                      setSelectedSongs((prev) =>
                        prev.filter((sid) => sid !== song!._id)
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Visibilidad */}
      <div className="flex items-center mt-4">
        <SwitchComponent isSelected={isVisible} onChange={setIsVisible} />
        <p className="text-md font-medium text-primary pl-2">
          ¿Playlist visible?
        </p>
      </div>
    </div>
  );
};
