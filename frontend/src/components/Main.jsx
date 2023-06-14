import { useEffect, useContext } from "react";
import Card from "./Card";
import { UnitContext } from "../Context/UnitContext";
import { OtherContext } from "../Context/OtherContext";

function Main({ navigate }) {

  const {
    GET_COUNT,
    TOTAL_COUNT
  } = useContext(UnitContext);

  const {
    SET_IS_LOADING
  } = useContext(OtherContext);

  useEffect(() => {
    SET_IS_LOADING(true)
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
