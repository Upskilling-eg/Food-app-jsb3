import React from "react";
import noData from "../../../../assets/images/no-data.png";

export default function DeleteData({ deleteItem }) {
  return (
    <>
    <div className="text-center">
    <img src={noData} alt="delete" />
      <h5>Delete this {deleteItem}</h5>
      <p>
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
    
    </>
  );
}
