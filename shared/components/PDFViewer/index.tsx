"use client";

import { COLORS } from "@/styles/colors";
import { PDFViewerProps } from "@/types/PlaylistsTypesProps";
import { PiScreencast } from "react-icons/pi";
import { Text } from "@/shared/components/Text";
import { useEffect, useRef, useState } from "react";
import { GlobalWorkerOptions, getDocument, PDFDocumentProxy } from "pdfjs-dist";


GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

export const PDFViewer = ({ selected, songs, setSelected }: PDFViewerProps) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [error, setError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.5);

  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const pdfInstanceRef = useRef<PDFDocumentProxy | null>(null);

  useEffect(() => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;

    setIsMobileOrTablet(/Android|iPhone|iPad|iPod/i.test(userAgent));
  }, []);

 
  useEffect(() => {
    if (!selected || !isMobileOrTablet) return;

    const loadPdf = async () => {
      try {
        setError(false);

        const pdf = await getDocument(selected.secure_url).promise;

        pdfInstanceRef.current = pdf;
        setNumPages(pdf.numPages);
        setPageNumber(1);

        renderPage(1, scale, pdf);
      } catch (err) {
        console.error("Error al cargar PDF:", err);
        setError(true);
      }
    };

    loadPdf();
  }, [selected, isMobileOrTablet]);

  useEffect(() => {
    if (pdfInstanceRef.current) {
      renderPage(pageNumber, scale, pdfInstanceRef.current);
    }
  }, [pageNumber, scale]);

  const renderPage = async (
    num: number,
    scaleValue: number,
    pdf: PDFDocumentProxy
  ) => {
    const container = pdfContainerRef.current;

    if (!container) return;

    container.innerHTML = "";

    const page = await pdf.getPage(num);
    const viewport = page.getViewport({ scale: scaleValue });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context!,
      viewport,
    }).promise;

    container.appendChild(canvas);
  };

  const handleFitToWidth = async () => {
    if (!pdfInstanceRef.current || !pdfContainerRef.current) return;

    const page = await pdfInstanceRef.current.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });

    const containerWidth = pdfContainerRef.current.clientWidth;

    setScale(containerWidth / viewport.width);
  };

  if (!selected) {
    return <div className="p-4">Selecciona una canción para visualizar.</div>;
  }

  const currentIndex = songs.findIndex(
    (song) => song.file.public_id === selected.public_id
  );

  return (
    <>
      <div className="py-0.5 px-1 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className={`px-2 py-1 rounded ${
              currentIndex === 0
                ? "bg-gray-200 opacity-50"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentIndex === 0}
            onClick={() => setSelected(songs[currentIndex - 1].file)}
          >
            <Text $color={COLORS.primary} $ta="center" $v="md">
              Atrás
            </Text>
          </button>

          <button
            className={`px-2 py-1 rounded ${
              currentIndex === songs.length - 1
                ? "bg-gray-200 opacity-50"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={currentIndex === songs.length - 1}
            onClick={() => setSelected(songs[currentIndex + 1].file)}
          >
            <Text $color={COLORS.primary} $ta="center" $v="md">
              Siguiente
            </Text>
          </button>
        </div>

        <a href={selected.secure_url} target="_blank" rel="noreferrer">
          <PiScreencast size={20} />
        </a>
      </div>

      {isMobileOrTablet && !error && (
        <div className="flex flex-wrap items-center gap-3 p-2 bg-gray-100">
          <button onClick={() => setPageNumber((p) => p - 1)}>⬅</button>

          <span>
            Página {pageNumber} de {numPages}
          </span>

          <button onClick={() => setPageNumber((p) => p + 1)}>➡</button>

          <div className="flex gap-2">
            <button onClick={() => setScale((s) => s - 0.2)}>-</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale((s) => s + 0.2)}>+</button>
          </div>

          <button onClick={handleFitToWidth}>
            <Text
              $color={COLORS.primary}
              $v="md"
              className="ml-1 underline underline-offset-4"
            >
              Ajustar a ancho
            </Text>
          </button>
        </div>
      )}

      {isMobileOrTablet ? (
        error ? (
          <iframe
            className="heigth-pdf w-full"
            src={selected.secure_url}
            title={`PDF Viewer - ${selected.public_id}`}
          />
        ) : (
          <div
            ref={pdfContainerRef}
            className="w-full h-full overflow-auto p-2"
          />
        )
      ) : (
        <iframe
          className="heigth-pdf w-full"
          src={selected.secure_url}
          title={`PDF Viewer - ${selected.public_id}`}
        />
      )}
    </>
  );
};
