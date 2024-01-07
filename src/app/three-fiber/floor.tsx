"use client";

import { MeshProps } from "@react-three/fiber";
import { FC, ReactNode } from "react";

const Floor: FC<MeshProps> = (props) => {
  return (
    <group dispose={null}>
      <mesh {...props} receiveShadow>
        <boxBufferGeometry args={[20, 1, 10]} />
        <meshPhysicalMaterial color="white" />
      </mesh>
    </group>
  );
};

export default Floor;
