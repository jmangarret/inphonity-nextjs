import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import StoreProvider from "@/app/StoreProvider";
import ModalProvider from "@/contexts/ModalProvider";
import "./globals.css";
import "./leaftlet.css";
import Head from "next/head";
import ChatInitializer from "@/components/ChatInitializer";

const aeonik = localFont({
  src: [
    {
      path: "../fonts/aeonik-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/aeonik-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-aeonik",
})

export const metadata: Metadata = {
  title: "Invitación Inphonity",
  description: "Aquí vas a poder unirte al círculo inphonity. Tendrás que llenar un formulario con algunos datos, podrás elegir el plan de tu preferencia y aquí mismo podrás realizar el pago. Para formalizar tu ingreso, firmarás tu contrato sin plazo forzoso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aeonik.variable}`}>
    <Head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      <link rel="stylesheet" href="https://unpkg.com/esri-leaflet@2.5.0/dist/esri-leaflet.css"/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet-responsive-popup@0.6.4/leaflet.responsive.popup.css"/>
    </Head>
    <body className='font-sans font-light text-white bg-black'>
    <StoreProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </StoreProvider>
    <ChatInitializer />
    </body>
    <Script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></Script>
    <Script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay.v1.min.js"></Script>
    <Script type="text/javascript" src="https://openpay.s3.amazonaws.com/openpay-data.v1.min.js"></Script>
    <Script type="text/javascript" src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></Script>
    <Script type="text/javascript" src="https://chat-assets.frontapp.com/v1/chat.bundle.js"></Script>
    </html>
  );
}
