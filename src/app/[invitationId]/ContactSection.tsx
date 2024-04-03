export default function ContactSection() {
    return (
        <section className="w-1/2 mx-auto my-10">
            <div className="flex flex-row  mb-52">
                <div className="flex flex-col">
                    <h2 className="font-medium text-2xl sm:text-3xl lg:text-5xl text-center">
                        ¿Tienes Dudas?
                    </h2>
                    <span className="text-highlight text-2xl my-5">¡Contáctanos!</span>
                </div>
                <div className="w-1/3 mx-5 flex flex-col">
                    <button className="btn-width multi-border text-white bg-opacity-50">
                        CHATEA EN LÍNEA
                    </button>
                    <button className="btn-width multi-border text-white bg-opacity-50 my-5">
                        LLAMA A UN ASESOR
                    </button>
                </div>
            </div>
        </section>
    );
}
