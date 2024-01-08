import { NextPage } from "next";
import Oceans from "./oceans";

const OceansPage: NextPage = () => {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <div id="content">
        <Oceans />
      </div>
    </main>
  );
};

export default OceansPage;
