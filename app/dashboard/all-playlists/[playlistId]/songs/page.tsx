import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";

export default function SongsPage({params}:any) {
  return <PlaylistPDFViewer type="fileSong" playlistId={params.playlistId}/>;
}