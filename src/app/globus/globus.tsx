"use client";

import { FC, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const Globus: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null!);
  const data = useGeoJsonData();
  console.log(data);

  useEffect(() => {
    let intervalId: number;
    if (data.features) {
      const context = d3.select(ref.current).node()?.getContext("2d");
      const projection = d3.geoOrthographic().scale(300);
      if (context) {
        const geoGenerator = d3
          .geoPath()
          .projection(projection)
          .pointRadius(4)
          .context(context);

        let yaw = 300;

        const update = () => {
          projection.rotate([yaw, -45]);

          context.clearRect(0, 0, 800, 600);

          context.lineWidth = 0.5;
          context.strokeStyle = "#333";
          context.beginPath();
          geoGenerator({ type: "FeatureCollection", features: data.features });
          context.stroke();

          // Graticule
          let graticule = d3.geoGraticule();
          context.beginPath();

          context.strokeStyle = "#ccc";
          geoGenerator(graticule());
          context.stroke();

          yaw -= 0.25;
        };

        intervalId = window.setInterval(update, 100);
      }
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [data]);

  return (
    <canvas
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "50vh",
        background: "white",
      }}
      ref={ref}
    ></canvas>
  );
};

export default Globus;
const useGeoJsonData = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    // fetch("/data/swissCantones.json")
    //   .then((res) => res.json())
    //   .then((data) => setData(data.results));
    d3.json(
      "https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json"
    ).then((json) => setData(json));
  }, []);

  return { features: data };
};
