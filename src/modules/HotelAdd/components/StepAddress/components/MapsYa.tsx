import { useEffect, useState, FC, use } from "react";
import Script from "next/script";
import styled from "styled-components";
import type ymaps from "yandex-maps";

type Props = {
  onChange(address: { kind: ymaps.IGeocodeOptions["kind"] & "country"; name: string }[]): void;
};

const MapsYa: FC<Props> = ({ onChange }) => {
  const [ymapsReady, setYmapsReady] = useState(false);
  const [myMap, setMyMap] = useState<ymaps.Map | null>(null);

  useEffect(() => {
    if (ymapsReady && !myMap) {
      const mM: ymaps.Map = new window.ymaps.Map("yandex-map", {
        center: [55.74, 37.58],
        zoom: 13,
        controls: [],
      });

      //   For development mode
      setMyMap(mM);

      // Get location
      const location: Promise<ymaps.geolocation.IGeolocationResult> =
        window.ymaps.geolocation.get();
      location.then(
        function (result: any) {
          const position = result.geoObjects.position;
          mM.setCenter(position, 13);
        },
        function (err) {
          console.log("Ошибка: " + err);
        },
      );

      // Search field
      const sC: ymaps.control.SearchControl = new window.ymaps.control.SearchControl({
        options: {
          provider: "yandex#search",
        },
      });
      mM.controls.add(sC);

      //   Get Address
      sC.events.add("resultselect", function (e) {
        const index = sC.getSelectedIndex();

        sC.getResult(index).then((data: any) => {
          const coordinates = data.geometry._coordinates;
          window.ymaps.geocode([coordinates[0], coordinates[1]]).then((result: any) => {
            const address =
              result.geoObjects.get(0).properties._data.metaDataProperty.GeocoderMetaData.Address
                .Components;

            if (address) {
              onChange(address);
            }
          });
        });
      });
    }
  }, [ymapsReady]);

  useEffect(() => {}, []);

  return (
    <>
      <YandexMapStyled id='yandex-map' />

      <Script
        strategy='afterInteractive'
        src='https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=7aa69540-e857-4ef2-b968-d810c276f609'
        onLoad={() => {
          if (typeof window !== "undefined")
            window.ymaps.ready(() => {
              setYmapsReady(true);
            });
        }}
      />
    </>
  );
};

const YandexMapStyled = styled.div`
  width: 100%;
  height: 400px;
`;

export default MapsYa;
