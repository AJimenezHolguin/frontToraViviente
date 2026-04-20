import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";

export default function ScoresPage({params}:any) {
  return <PlaylistPDFViewer type="fileScore" playlistId={params.playlistId} />;
}