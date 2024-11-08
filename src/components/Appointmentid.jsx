import { useParams } from 'react-router-dom';






export default function Appointmentid(){



  const {id} = useParams();

  return <h1>id :{id}</h1>
}