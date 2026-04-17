import PlaylistPDFViewer from "@/shared/components/PlaylistPDFViewer";


export default function ScoresPage({params}:{params:{id:string}}) {
    return <PlaylistPDFViewer type="fileScore" playlistId={params.id} />; 
  }