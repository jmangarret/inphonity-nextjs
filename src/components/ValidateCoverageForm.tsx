/// <reference types="@types/google.maps" />
"use client";
import React from "react";
import {ModalContext} from "@/contexts/ModalContext";
// @ts-ignore
import { Loader } from "@googlemaps/js-api-loader";
import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";

type ValidateCoverageFormProps = {
  style?: React.CSSProperties;
  className?: string;
};

declare var L: any;

const ValidateCoverageForm: React.FC<ValidateCoverageFormProps> = ({className, style}) => {
  const {openModal} = React.useContext(ModalContext);
  const [postalCode, setPostalCode] = React.useState<string>('');
  const [geocoder, setGeocoder] = React.useState<google.maps.Geocoder>();

  React.useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
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
        <div>
          <p
            className={`text-center text-lg p-4 md:p-5`}
          >
            Debes ingresar un código postal.
          </p>
        </div>,
      );

      return;
    }
    if (isNaN(Number(postalCode))) {
      openModal(
        <div>
          <p
            className={`text-center text-lg p-4 md:p-5`}
          >
            El código postal ingresado no es válido.
          </p>
        </div>,
      );

      return;
    }
    if (postalCode.length !== 5) {
      openModal(
        <div>
          <p
            className={`text-center text-lg p-4 md:p-5`}
          >
            El código postal ingresado no es válido.
          </p>
        </div>,
      );

      return;
    }

    let lat = 0;
    let lng = 0;

    geocoder.geocode({address: `CP: ${postalCode}, México`}, (results, status) => {
      if (status === "OK" && results) {
        const location = results[0].geometry.location;

        lat = location.lat();
        lng = location.lng();
      } else {
        openModal(
          <div>
            <p
              className={`text-center text-lg p-4 md:p-5`}
            >
              No se encontró el código postal ingresado.
            </p>
          </div>,
        );
      }
    });

    openModal(
      <div
        className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-soft-blue lg:w-[1100px]`}
      >
        <div className={`grid grid-cols-12`}>
          <div className="hidden md:flex md:col-span-2 justify-center">
            {/* PlusDecoration */}
            <PlusDecoration
              className="w-4 md:w-8 relative mx-auto"
            />
          </div>

          <div
            className="col-span-12 md:col-span-8"
          >
            <div>
              <Image
                src={`/img/marker-icon.svg`}
                alt={`Ubicación`}
                width={80}
                height={80}
                className={`mx-auto block mb-4`}
              />

              <h1 className={`text-2xl font-medium mb-8 relative`}>
                Si tu zona <span style={{color: '#F9D08B'}}>no está</span> marcada en verde podrías
                <br/>
                presentar menor velocidad en tu servicio
                <br/>
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-4 md:w-8 absolute"
                  style={{right: '-30px', bottom: '-10px'}}
                />
              </h1>
            </div>

            <div
              className={`flex justify-center`}
            >
              <div
                className={`relative`}
                style={{width: '100%'}}
              >
                <div
                  id={`map`}
                  style={{width: '100%', height: '400px'}}
                ></div>
              </div>
            </div>
          </div>
          <div
            className={`hidden md:flex md:col-span-2 justify-center items-end`}
          >
            {/* PlusDecoration */}
            <PlusDecoration
              className="w-9 md:w-12 lg:w-16 xl:w-20"
            />
          </div>
        </div>
      </div>,
    );

    setTimeout(() => {
      const map = L.map('map').setView([lat, lng], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);
      L.control.scale().addTo(map);
      map.setZoom(12);

      const results = L.layerGroup().addTo(map);
      let marker = new L.Marker({lat, lng})
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
          className="flex items-center py-2 gap-3"
        >
          <div>
            <input
              type="text"
              className="input bg-white rounded-full outline-amber-500 transition duration-300 text-black font-light w-full"
              placeholder="Introduce tu Código Postal"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
            />
          </div>
          <div className="button-container">
            <button
              className="multi-border font-medium block w-full"
              onClick={handleSubmit}
            >
              Revisar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCoverageForm;
