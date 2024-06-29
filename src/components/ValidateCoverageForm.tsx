/// <reference types="@types/google.maps" />
"use client";
import React from "react";
import { ModalContext } from "@/contexts/ModalContext";
// @ts-ignore
import { Loader } from "@googlemaps/js-api-loader";
import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import FloatingDecoration from "./FloatingDecoration";

type ValidateCoverageFormProps = {
  style?: React.CSSProperties;
  className?: string;
};

declare var L: any;

const ValidateCoverageForm: React.FC<ValidateCoverageFormProps> = ({ className, style }) => {
  const { openModal, closeModal } = React.useContext(ModalContext);
  const [postalCode, setPostalCode] = React.useState<string>('');
  const [geocoder, setGeocoder] = React.useState<google.maps.Geocoder>();

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.toString() || "",
      version: "weekly",
    });

    loader.load().then(() => {
      setGeocoder(new google.maps.Geocoder());
    });
  }, []);

  const handleSubmit = async () => {
    if (!geocoder) {
      return;
    }

    // validate postal code
    if (!postalCode) {
      openModal(
        <div className="bg-white">
          <FloatingDecoration
            className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
            img="/img/modal-eclipse-orange-1.svg"
          />

          <FloatingDecoration
            className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
            img="/img/red-plus.svg"
          />
          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
              Debes ingresar un código postal.
            </p>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
            img="/img/red-plus.svg"
          />

          <FloatingDecoration
            className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
            img="/img/modal-eclipse-orange-2.svg"
            customClass="rounded-bl-2xl"
          />
        </div>,
      );

      return;
    }
    if (isNaN(Number(postalCode))) {
      openModal(
        <div className="bg-white">
          <FloatingDecoration
            className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
            img="/img/modal-eclipse-orange-1.svg"
          />

          <FloatingDecoration
            className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
            img="/img/red-plus.svg"
          />
          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
              El código postal ingresado no es válido.
            </p>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
            img="/img/red-plus.svg"
          />

          <FloatingDecoration
            className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
            img="/img/modal-eclipse-orange-2.svg"
            customClass="rounded-bl-2xl"
          />
        </div>,
      );

      return;
    }
    if (postalCode.length !== 5) {
      openModal(
        <div className="bg-white">
          <FloatingDecoration
            className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
            img="/img/modal-eclipse-orange-1.svg"
          />

          <FloatingDecoration
            className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
            img="/img/red-plus.svg"
          />
          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
              El código postal ingresado no es válido.
            </p>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
            img="/img/red-plus.svg"
          />

          <FloatingDecoration
            className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
            img="/img/modal-eclipse-orange-2.svg"
            customClass="rounded-bl-2xl"
          />
        </div>,
      );

      return;
    }

    let lat = 0;
    let lng = 0;

    geocoder.geocode({ address: `CP: ${postalCode}, México` }, (results, status) => {
      if (status === "OK" && results) {
        const location = results[0].geometry.location;

        lat = location.lat();
        lng = location.lng();
      } else {
        openModal(
          <div className="bg-white">
            <FloatingDecoration
              className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
              img="/img/modal-eclipse-orange-1.svg"
            />

            <FloatingDecoration
              className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
              img="/img/red-plus.svg"
            />

            <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
              <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
                No se encontró el código postal ingresado.
              </p>
            </div>

            <FloatingDecoration
              className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
              img="/img/red-plus.svg"
            />

            <FloatingDecoration
              className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
              img="/img/modal-eclipse-orange-2.svg"
              customClass="rounded-bl-2xl"
            />
          </div>,
        );
      }
    });

    openModal(
      <div className={`text-center text-black w-full`}>
        <FloatingDecoration
          className={`w-24 md:w-32 absolute top-[0%] left-[0%]`}
          img="/img/modal-eclipse-green-1.svg"
          customClass="rounded-tl-2xl"
        />

        <PlusDecoration
          className="w-4 md:w-8 absolute top-[41%] md:top-[28%] left-[2%]"
          isGreen={true}
        />

        <div className={`grid grid-cols-12`}>
          <div className="col-span-12">
            <div>
              <Image
                src={`/img/marker-icon.svg`}
                alt={`Ubicación`}
                width={50}
                height={50}
                className={`mx-auto block`}
              />

              <h1 className={`text-xl mb-2 relative p-8`}>
                Si tu zona está
                <span className="font-medium"> marcada en verde </span>
                la velocidad de tu servicio será mayor.
                <br />
              </h1>
            </div>

            <div className={`flex justify-center`}>
              <div className={`relative w-4/5`}>
                <div
                  id={`map`}
                  className="w-full h-[200px] md:h-[400px]"
                ></div>
              </div>
            </div>
          </div>

          <div className="col-span-12 mt-10 mb-20 md:mb-10">
            <div className="flex justify-center">
              <div className="button-container">
                <button
                  className="bg-black btn-xl multi-border font-medium text-white disabled:opacity-50"
                  onClick={closeModal}
                >
                  ACEPTAR
                </button>
              </div>
            </div>
          </div>
        </div>

        <FloatingDecoration
          className={`w-6 md:w-12 absolute bottom-[30%] right-[2%] md:bottom-[20%]`}
          img="/img/orange-plus.svg"
        />

        <FloatingDecoration
          className={`w-24 md:w-32 absolute bottom-[0%] right-[0%]`}
          img="/img/modal-eclipse-green-2.svg"
          customClass="rounded-br-2xl"
        />
      </div>,
      <div></div>,
      false,
    );

    setTimeout(() => {
      const map = L.map('map').setView([lat, lng], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);
      L.control.scale().addTo(map);
      map.setZoom(12);

      const results = L.layerGroup().addTo(map);
      let marker = new L.Marker({ lat, lng })
      results.addLayer(marker)

      const baselayers = {
        "SelectedLayers": L.tileLayer.wms('https://geomap.altanredes.com/geoserver/web_altanredes_geoaltan/ows?SERVICE=WMS?&authkey=fa443693', {
          layers: 'Cobertura_Garantizada',
          format: 'image/png',
          transparent: true,
          tiled: true,
        })
      }
      baselayers["SelectedLayers"].addTo(map);
    }, 600);
  };

  return (
    <div
      style={style || {}}
      className={`${className || ''}`}
    >
      <div
        className="w-full"
      >
        <div
          className="flex items-center py-2 gap-3 flex-col sm:flex-row"
        >
          <div className="w-full sm:w-3/5">
            <input
              type="text"
              className="input bg-white rounded-full outline-amber-500 transition duration-300 text-black font-light w-full sm:w-[18.438rem !important] input-imei-postal"
              placeholder="Introduce tu Código Postal"
              onChange={(e) => { e.target.value = e.target.value.replace(/\D/g, ''); setPostalCode(e.target.value) }}
              value={postalCode}
              maxLength={5}
              autoComplete="off"
            />
          </div>
          <div className="button-container w-full sm:w-2/5">
            <button
              className="multi-border font-medium block w-full bg-black w-full sm:btn-imei-postal"
              onClick={handleSubmit}
            >
              REVISAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCoverageForm;
