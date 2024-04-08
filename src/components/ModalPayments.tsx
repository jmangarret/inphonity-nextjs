import Image from "next/image"

export const HeaderTiendasAfiliadas = () =>{
    return (
      <div className="font-medium text-center">
        Tiendas <span className="text-highlight">Afiliadas</span>
      </div>
    )
  }
  export const ContenTiendasAfiliadas = () => {
    return (
      <div className="bg-black bg-luces flex justify-center">
        <Image
          src="/img/tiendas-afiliadas.png"
          alt="Tiendas Afiliadas"
          width={354}
          height={1570}
        />
      </div>
    )
  }