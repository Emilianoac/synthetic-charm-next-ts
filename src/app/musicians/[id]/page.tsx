import Image from "next/image";
import axios, {AxiosError} from "axios";
import type { Error } from "@/types/errors";
import type { Musician } from "@/types/musician";
import "./page.scss"
import ErrorAlert from "@/components/ErrorAlert";
import MusicPlayer from "@/components/MusicPlayer";

/**
 * Objeto que contiene los datos de los músicos el estado de error.
 */
const musician = {
  data: null as Musician | null,
  error: {
    statusCode: "",
    message: ""
  } as Error
}

/**
 * Obtiene los datos del musico desde la API si es que existe 
 * y establece el objeto de error si ocurre un error.
 * 
 */
async function getData(id : string): Promise<Musician | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_BASE_URL}/api/musicians/${id}`);
    const data = res.data as Musician
    return data 

  } catch(error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        musician.error.statusCode = axiosError.response.status.toString()
        musician.error.message = axiosError.response.statusText
      } else if (axiosError.request) {
        musician.error.message = "No response was received from the server, possibly a network error occurred."
      }
    }
  }
  return null
}

export default async function MusicianProfile({params}: {params: {id: string}}) {
  musician.data = await getData(params.id)
  
  return (
    <>
      {musician.data ?
        <div className="perfil-musico">
          <div className="perfil-musico__imagen">
            <h1 className="fw-bold text-uppercase mb-1">{musician.data.name}</h1>
            <p className="mb-3">{musician.data.musical_genre}</p>
            <Image
              width={600}
              height={600}
              className="img-fluid"
              style={{ border: `5px solid ${musician.data.color}` }}
              src={musician.data.profileImage.url}
              title={musician.data.name}
              alt={`Profile image ${musician.data.name}`}
            />
          </div>
          <div className="perfil-musico__informacion">
            <div className="musico-datos">
              <dl>
                <dt>Country</dt>
                <dd>{musician.data.country}</dd>
                
                <dt>Age</dt>
                <dd>{musician.data.age}</dd>

                <dt>Instrument</dt>
                <dd>{musician.data.instrument}</dd>

                <dt>Biography</dt>
                <dd>{musician.data.bio}</dd>

                <dt>Facts</dt>
                <dd>{musician.data.fun_fact}</dd>
              </dl>
            </div>
          </div>
          <div className="perfil-musico__albumes">
            <div className="album">
              <div className="album__header">
                <div className="album__info">
                  <p className="fw-bold mb-1">{musician.data.name}</p>
                  <p className="mb-1">{musician.data.albums[0].title}</p>
                  <p className="small">{musician.data.albums[0].year}</p>
                </div>
                <Image 
                  height={200} 
                  width={200} 
                  className="album__cover img-fluid" 
                  src={musician.data.albums[0].cover.url} 
                  alt={musician.data.albums[0].title} 
                />
              </div>
              <MusicPlayer songs={musician.data.albums[0].songs}/>
            </div>
          </div>
        </div>
      :
      <ErrorAlert {... musician.error}/>
      } 
    </>
  );
}