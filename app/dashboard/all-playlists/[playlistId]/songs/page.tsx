import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";

export default function songsPage({params}:{params:{playlistId:string}}) {
  return <PlaylistPDFViewer type="fileSong" playlistId={params.playlistId}/>;
}