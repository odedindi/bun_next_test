import { NextPage } from "next";
import Globus from "./globus";

const GlobusPage: NextPage = () => {
  return (
    <main style={{ height: "100vh", width: "100vw",  }}>
      <h1>Globus example</h1>
      <div id="content">
        <Globus />
      </div>
    </main>
  );
};

export default GlobusPage;
