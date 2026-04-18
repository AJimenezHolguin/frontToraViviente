import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";


export default function ScoresPage({params}:{params:{playlistId:string}}) {
    return <PlaylistPDFViewer type="fileScore" playlistId={params.playlistId} />; 
  }