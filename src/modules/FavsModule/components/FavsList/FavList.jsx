import React, { useEffect, useState } from "react";
import headerImg from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";

export default function FavList() {
  let [favsList, setFavsList] = useState([]);
  const getFavsList = async () => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFavsList(response.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  useEffect(() => {
    getFavsList();
  }, []);
  return (
    <>
      <Header
        title={"Welcome Favs"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerImg}
      />
      <div className="container-fluid">
        <div className="row">
          {favsList.length > 0 ? (
            <div className="col-md-4">
              <div>
                <h4>fav</h4>
              </div>
            </div>
          ) : (
            <NoData/>
          )}
        </div>
      </div>
    </>
  );
}
