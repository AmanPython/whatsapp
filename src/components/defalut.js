import React from "react";
import axios from "axios";

const Test = () => {
  const getData = () => {
    axios
      .get(
        `https://dev.olvorchidnaigaon.letseduvate.com/qbox/erp_user/branch/?session_year=1&module_id=252`
      )
      .then((result) => {
        console.log("result is :>", result);
      });
    return (
      <div style={{ alignItems: "center" }} onClick={() => getData()}>
        <input></input>
        <div>Gopi Naath </div>
      </div>
    );
  };
};

export default Test;
