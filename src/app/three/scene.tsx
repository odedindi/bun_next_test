"use client";

import { FC, useRef, useEffect } from "react";
import * as THREE from "three";
import { useResizeHandler } from "./hooks/useResizeHandler";

const ThreeScene: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initResizeHandler = useResizeHandler();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight - 20);
      initResizeHandler({ camera, renderer });
      containerRef.current?.appendChild(renderer.domElement);
      renderer.domElement.style.background = "black";
      camera.position.z = 5;

      const cube = createCube({ scene, camera, renderer });
      const renderScene = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);

        requestAnimationFrame(renderScene);
      };
      renderScene();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;

const createCube = ({
  scene,
  camera,
  renderer,
}: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}) => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Render the scene and camera
  renderer.render(scene, camera);
  return cube;
};
