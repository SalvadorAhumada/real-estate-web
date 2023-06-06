import { useEffect, useContext } from "react";
import Card from "./Card";
import { UnitContext } from "../Context/UnitContext";

function Main({ navigate }) {

  const {
    GET_COUNT,
    TOTAL_COUNT
  } = useContext(UnitContext);

  useEffect(() => {
    GET_COUNT();
  }, [])

  return (
    <div className="main">
      {TOTAL_COUNT.map((cluster, index) => {
        return <Card navigate={navigate} cluster={cluster} key={index} />
      })}
    </div>
  );
}

export default Main;
