"use client";

import { MeshProps } from "@react-three/fiber";
import { FC } from "react";

const Boz: FC<MeshProps> = (props) => {
  return (
    <mesh {...props} receiveShadow={true} castShadow>
      <boxBufferGeometry />
      <meshPhysicalMaterial color={"white"} />
    </mesh>
  );
};

export default Boz;
