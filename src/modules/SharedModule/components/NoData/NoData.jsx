import React from "react";
import noData from "../../../../assets/images/no-data.png";
export default function NoData() {
  return (
    <div className="text-center my-3">
      <img src={noData} alt="" className="my-3" />
      <h3>No Data</h3>
    </div>
  );
}
