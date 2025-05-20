"use client";
import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Pagination,
  Selection,
  SortDescriptor,
} from "@heroui/react";

import { SearchIcon } from "@/shared/components/table/TableIcons";
import { columns } from "@/shared/components/table/columnsAndStatusOptions";

import { Song } from "@/types/SongsTypesProps";
import { getAllSongs } from "@/services/songs/getAllSongs.service";
import { IoLogoYoutube } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa6";
import { SpinnerComponent } from "@/shared/components/Spinner";
import { Sizes } from "@/types/sizes.enum";
import { Colors } from "@/types/color.enum";
import { SpinnerVariant } from "@/shared/components/Spinner/types";
import { COLORSTEXT } from "@/shared/styles/colors";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "user",
  "linkSong",
  "category",
  "fileSong",
  "fileScore",
];

export const AllSong = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSongs = async () => {
    setIsLoading(true);

    try {
      const songsData = await getAllSongs();

      setSongs(songsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...songs];

    if (hasSearchFilter) {
      filtered = filtered.filter((data) =>
        data.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filtered;
  }, [songs, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Song] as string;
      const second = b[sortDescriptor.column as keyof Song] as string;

      return sortDescriptor.direction === "ascending"
        ? String(first).localeCompare(String(second))
        : String(second).localeCompare(String(first));
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((data: Song, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof Song];

    switch (columnKey) {
      case "user":
        return <span>{data.user?.name || "N/A"}</span>;
      case "linkSong":
        return (
          <a href={data.linkSong} rel="noopener noreferrer" target="_blank">
            <IoLogoYoutube color="red" size={20} />
          </a>
        );
      case "fileSong":
        return (
          <a
            className="flex justify-center items-center"
            href={data.fileSong.secure_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaFilePdf color={COLORSTEXT.secondary} size={20} />
          </a>
        );
      case "fileScore":
        return (
          <a
            className="flex justify-center items-center"
            href={data.fileScore.secure_url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaRegFilePdf color={COLORSTEXT.secondary} size={20} />
          </a>
        );
      default:
        return <span>{String(cellValue)}</span>;
    }
  }, []);

  const onSearchChange = (value?: string) => {
    setFilterValue(value || "");
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <SpinnerComponent
          color={Colors.PRIMARY}
          size={Sizes.MD}
          variant={SpinnerVariant.WAVE}
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {songs.length} canciones
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>

      <Table
        isHeaderSticky
        aria-label="Tabla de canciones"
        bottomContent={
          <div className="py-2 px-2 flex z-0 justify-between items-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent="No se encontraron canciones"
          itemID="_id"
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
