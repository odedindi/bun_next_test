import { useEffect, useState } from "react";
import * as THREE from "three";

export const useResizeHandler = () => {
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

  const initHook = ({
    camera,
    renderer,
  }: {
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
  }) => {
    setRenderer(renderer);
    setCamera(camera);
  };
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined" && !!renderer && !!camera) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height - 20);
        // camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [camera, renderer]);

  return initHook;
};
