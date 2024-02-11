
import { Error } from "@/types/errors";

export default function ErrorAlert({ statusCode, message }: Error) {{
  return (
    <div>
      {statusCode && <h1>{statusCode}</h1>}
      {message}
    </div>
  )
}}