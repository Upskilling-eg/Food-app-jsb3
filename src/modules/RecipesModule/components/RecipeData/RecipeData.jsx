import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecipesListHeader from "../../../SharedModule/components/RecipesListHeader/RecipesListHeader";
export default function RecipeData() {
  const [categoriestList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("tagId", data.tagId);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };

  const onSubmit = async (data) => {
    let receipeFormData = appendToFormData(data);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe",
        receipeFormData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      navigate("/dashboard/recipes");
    } catch (error) {
      alert("failed");

      //   toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  useEffect(() => {
    getCategoriesList();
    getTagsList();
  }, []);
  return (
    <>
      <RecipesListHeader />
      <div className="p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              {...register("name", {
                required: "name is required",
              })}
            />
          </div>
          {errors.name && (
            <p className="alert alert-danger p-2 p-1">{errors.name.message}</p>
          )}

          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("tagId", {
                required: "tag is required",
              })}
            >
              <option value="">select</option>
              {tagsList.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <p className="alert alert-danger p-2 p-1">{errors.tagId.message}</p>
          )}

          <div className="input-group mb-1">
            <input
              type="number"
              className="form-control"
              placeholder="Recipe price"
              {...register("price", {
                required: "price is required",
              })}
            />
          </div>
          {errors.price && (
            <p className="alert alert-danger p-2 p-1">{errors.price.message}</p>
          )}

          <div className="input-group mb-1">
            <select
              className="form-control"
              {...register("categoriesIds", {
                required: "categoriesIds is required",
              })}
            >
              <option value="">select</option>
              {categoriestList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <p className="alert alert-danger p-2 p-1">
              {errors.categoriesIds.message}
            </p>
          )}

          <div className="input-group mb-1">
            <textarea
              className="form-control"
              placeholder="Recipe description"
              {...register("description", {
                required: "description is required",
              })}
            />
          </div>
          {errors.description && (
            <p className="alert alert-danger p-2 p-1">
              {errors.description.message}
            </p>
          )}

          <div className="input-group mb-1">
            <input
              type="file"
              className="form-control"
              {...register("recipeImage", {
                required: "image is required",
              })}
            />
          </div>
          {errors.recipeImage && (
            <p className="alert alert-danger p-2 p-1">
              {errors.recipeImage.message}
            </p>
          )}

          <button className="btn btn-success">Save</button>
        </form>
      </div>
    </>
  );
}
