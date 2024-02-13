import Image from "next/image";
import Link from "next/link";
import axios, {AxiosError} from "axios";
import type { Error } from "@/types/errors";
import type { Musician } from "@/types/musician";
import "./page.scss"
import ErrorAlert from "@/components/ErrorAlert";
import SetBackground from "@/components/utils/SetBackground";

/**
 * Objeto que contiene los datos de los músicos el estado de error
 */
const musicians = {
  data: [] as Musician[] | null,
  error: {
    statusCode: "",
    message: ""
  } as Error
}

/**
 * Obtiene los datos de los músicos desde la API y establece el objeto de error si ocurre un error
 * @returns Promise<Musician[] | null> - Un array de músicos o null si ocurre un error
 * 
 */
async function getData(): Promise<Musician[] | null> {
  try {
    const res = await axios.get(`${process.env.NEXT_BASE_URL}/api/musicians`);
    const data = res.data as Musician[]
    return data 

  } catch(error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      if (axiosError.response) {
        musicians.error.statusCode = axiosError.response.status.toString()
        musicians.error.message = axiosError.response.statusText
      } else if (axiosError.request) {
        musicians.error.message = "No response was received from the server, possibly a network error occurred."
      }
    }
  }
  return null
}

async function Home() {
  musicians.data = await getData()
  return (
    <>
      <SetBackground image="" color="#242424"/>
      <main className="galeria-musicos">
        <div className="row">
          {musicians.data && musicians.data.length > 0 ? 
            (musicians.data.map( musico => (
              <div className="col-6 col-md-4 col-lg-3 mt-5" key={musico.name}>
                <article className="card-musico">
                  <Link href={`/musicians/${musico.slug}`}>
                    <Image 
                      className="img-fluid"
                      style={{borderColor: musico.color}}
                      width={600} 
                      height={600} 
                      src={musico.profileImage.url} 
                      alt={musico.profileImage.name}
                    />
                    <h4 className="mt-3 fw-bold">{musico.name }</h4>
                    <p className="small muted mt-1 mb-0">{ musico.musical_genre }</p>              
                  </Link>
                </article> 
              </div>
              ))
            ) 
            : 
            <ErrorAlert statusCode={musicians.error.statusCode} message={musicians.error.message}/>
          }
        </div>
      </main>
    </>
  );
}

export default Home