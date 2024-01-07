"use client";

import { FC, PropsWithChildren, ReactNode } from "react";

import { Canvas, extend } from "@react-three/fiber";
import Floor from "./floor";
import Box from "./box";
import LightBulb from "./lightBulb";

const ExtendThree: FC<PropsWithChildren> = ({ children }) =>
  extend(<div>{children}</div>) as ReactNode;

const ThreeScene: FC = () => {
  return (
    <ExtendThree>
      <Canvas
        shadows
        style={{ height: "100vh", width: "100vw" }}
        camera={{
          position: [16, 10, 10],
        }}
      >
        <ambientLight color={"white"} intensity={0.3} />
        <LightBulb position={[0, 3, 0]} />
        <Box />
        <Floor position={[0, -1, 0]} />
      </Canvas>
    </ExtendThree>
  );
};

export default ThreeScene;
