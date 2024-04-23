'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex place-items-center place-content-center my-20 mx-10 text-center">
      <h1 className="text-3xl my-20">Ha ocurrido un error con la invitación!</h1>
    </div>
  )
}