"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { useScreenSize } from "../hooks/useScrennSize";

const speed = 0.01;

const sphere: d3.GeoGeometryObjects = { type: "Sphere" };
const graticule = d3.geoGraticule10();

const renderCanvas = ({
  ctx,
  data,
  path,
  projection,
  screenSize,
}: {
  ctx: CanvasRenderingContext2D;
  path: d3.GeoPath;
  data: ReturnType<typeof topojson.feature>;
  screenSize: { width: number; height: number };
  projection: d3.GeoProjection;
}): any => {
  ctx.clearRect(0, 0, screenSize.width, screenSize.height);
  ctx.save();

  ctx.beginPath();
  projection.precision(0);
  path(data);
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "steelblue";
  ctx.fill();

  ctx.beginPath();
  projection.precision(0.5);
  path(graticule);
  ctx.globalAlpha = 0.125;
  ctx.strokeStyle = "#fff";
  ctx.stroke();

  ctx.beginPath();
  path(sphere);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "teal";
  ctx.stroke();
  ctx.restore();
};

const Oceans: FC = () => {
  const ref = useRef<HTMLCanvasElement>(null!);
  const screenSize = useScreenSize();
  const oceans = useGeoJsonData("data/oceans.json");
  const topology = useGeoJsonData("data/topology.json");
  const data = useMemo(() => ({ oceans, topology }), [oceans, topology]);
  const ocean = useMemo(
    () =>
      data.topology
        ? topojson.feature(data.topology, data.topology.objects.ocean)
        : null,
    [data.topology]
  );
  const [rotation, setRotation] = useState<number>(-25);
  console.log({ page: "Oceans", data, ocean, screenSize });

  const projection = useMemo(
    () =>
      d3.geoOrthographic().fitExtent(
        [
          [48, 48],
          [screenSize.width - 48, screenSize.height - 48],
        ],
        sphere
      ),
    [screenSize]
  );

  useEffect(() => {
    let intervalId: number;
    if (ocean && ref.current) {
      const context = ref.current.getContext("2d");
      if (context) {
        context.canvas.width = screenSize.width;
        context.canvas.height = screenSize.height;
        context.canvas.style.background = "lightblue";
        const path = d3.geoPath(projection, context);

        intervalId = window.setInterval(() => {
          renderCanvas({
            ctx: context,
            data: ocean,
            path,
            projection,
            screenSize,
          });
          projection.rotate([speed * performance.now(), rotation]);
        }, 60);
      }
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [
    data,
    rotation,
    ocean,
    screenSize.width,
    screenSize.height,
    projection,
    screenSize,
  ]);

  return (
    <>
      <input
        type="range"
        min="-90"
        max="90"
        value={rotation}
        onChange={({ currentTarget: { value } }) => {
          setRotation(parseInt(value));
        }}
        className="slider"
        id="myRange"
      />
      <p>
        <strong>Rotation angle: </strong>
        {rotation}
      </p>
      <canvas
        style={{
          width: "100%",
          height: "auto",
        }}
        ref={ref}
      ></canvas>
    </>
  );
};

export default Oceans;

const useGeoJsonData = (url: string) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    d3.json(url).then((json) => setData(json));
  }, [url]);

  return data;
};
