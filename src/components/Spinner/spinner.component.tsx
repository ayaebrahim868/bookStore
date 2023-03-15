import {  CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";


const override: CSSProperties = {
  display: "block",
  margin: "350px auto",
  borderColor: "red",
};

function Spinner() {

  return (
    <PacmanLoader color='#2e7c31' cssOverride={override} size='50px'/>
  );
}
export default Spinner;