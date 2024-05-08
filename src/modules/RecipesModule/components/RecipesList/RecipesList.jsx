import React, { useContext, useEffect, useState } from "react";
import Header from "../../../SharedModule/components/Header/Header";
import headerImg from "../../../../assets/images/header.png";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noData from "../../../../assets/images/no-data.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";

export default function RecipesList() {
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [categoriestList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [nameValue, setNameValue] = useState("");

  const [catValue, setCatValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getCategoriesList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  const getTagsList = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  const getRecipesList = async (name, tagId, catId, pageSize, pageNumber) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            name: name,
            tagId: tagId,
            categoryId: catId,
          },
        }
      );

      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      console.log(arrayOfPages);
      console.log(response.data.totalNumberOfPages);
      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipesList(input.target.value, tagValue, catValue, 3, 1);
  };
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipesList(nameValue, tagValue, input.target.value, 3, 1);
  };
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipesList(nameValue, input.target.value, catValue, 3, 1);
  };

  const goToReceipeData = () => {
    navigate("/dashboard/recipeData");
  };

  useEffect(() => {
    getRecipesList("", "", "", 3, 1);
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <Header
        title={"Recipes"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />

      <div className="container-fluid p-5">
        <div className="row my-3">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 text-end">
            {loginData?.userGroup == "SuperAdmin" ? (
              <button onClick={goToReceipeData} className="btn btn-success">
                Add new Receipe
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-6">
              <input
                placeholder="search by recipe name..."
                type="text"
                className="form-control"
                onChange={getNameValue}
              />
            </div>
            <div className="col-md-3">
              <select className="form-control" onChange={getCatValue}>
                <option value="">search by Category</option>
                {categoriestList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-control" onChange={getTagValue}>
                <option value="">search by Tag</option>
                {tagsList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {recipesList.length > 0 ? (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Tag</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {item.imagePath ? (
                        <img
                          className="item-img"
                          src={
                            "https://upskilling-egypt.com:3006/" +
                            item.imagePath
                          }
                          alt=""
                        />
                      ) : (
                        <img className="item-img" src={noData} alt="no img" />
                      )}
                    </td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{item.category[0]?.name}</td>
                    <td>{item.tag.name}</td>
                    {loginData?.userGroup == "SuperAdmin" ? (
                      <td>
                        <i
                          className="fa fa-edit text-warning mx-2"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {arrayOfPages.map((pageNo) => (
                  <li
                    className="page-item"
                    onClick={() =>
                      getRecipesList(nameValue, tagValue, catValue, 3, pageNo)
                    }
                  >
                    <a className="page-link">{pageNo}</a>
                  </li>
                ))}

                <li className="page-item">
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
