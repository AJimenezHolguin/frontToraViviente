import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";

export default function songsPage({params}:any) {
  return <PlaylistPDFViewer type="fileSong" playlistId={params.playlistId}/>;
}