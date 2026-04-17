import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";

export default function songsPage({params}:{params:{id:string}}) {
  return <PlaylistPDFViewer type="fileSong" playlistId={params.id}/>;
}