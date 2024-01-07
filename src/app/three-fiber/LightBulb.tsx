"use client";

import { MeshProps } from "@react-three/fiber";
import { FC, ReactNode } from "react";

const LightBulb: FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"} />
    </mesh>
  );
};

export default LightBulb;
