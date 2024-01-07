import { NextPage } from "next";
import ThreeScene from "./scene";

const ThreePage: NextPage = () => {
  return (
    <>
      <main style={{ height: "100vh", width: "100vw" }}>
        <h1>Three.js example</h1>
        <ThreeScene />
      </main>
    </>
  );
};
export default ThreePage;
