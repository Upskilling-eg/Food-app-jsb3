import React, { useContext, useEffect, useState } from "react";
import headerImg from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { AuthContext } from "../../../../context/AuthContext";

export default function CategoriesList() {
  let { baseUrl, requestHeaders } = useContext(AuthContext);
  const [categoriestList, setCategoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [arrayOfPages, setArrayOfPages] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setShowDelete(true);
  };

  const getCategoriesList = async (name, pageSize, PageNo) => {
    try {
      let response = await axios.get(
        `${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${PageNo}`,
        {
          headers: requestHeaders,
          params: { name: name },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${baseUrl}/Category`, data, {
        headers: requestHeaders,
      });
      handleClose();
      getCategoriesList();
      console.log(response);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };
  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(`${baseUrl}/Category/${catId}`, {
        headers: requestHeaders,
      });
      handleDeleteClose();
      getCategoriesList();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategoriesList("", 20, 1);
  }, []);

  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getCategoriesList(input.target.value, 20, 1);
  };

  return (
    <>
      <Header
        title={"Categories List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={headerImg}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add Category</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Category Name "
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </div>
            {errors.name && (
              <p className="alert alert-danger">{errors.name.message}</p>
            )}

            <button className="btn btn-success w-100">Save</button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Category"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid p-4">
        <div className="row my-3">
          <div className="col-md-6">
            <h4>Categories Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 text-end">
            <button onClick={handleShow} className="btn btn-success">
              Add new Category
            </button>
          </div>
        </div>
        <div className="filteration my-3">
          <div className="row">
            <div className="col-md-12">
              <input
                placeholder="search by category name..."
                type="text"
                className="form-control"
                onChange={getNameValue}
              />
            </div>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Category Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriestList.length > 0 ? (
              categoriestList.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-edit text-warning mx-2"
                      aria-hidden="true"
                    ></i>
                    <i
                      onClick={() => handleDeleteShow(item.id)}
                      className="fa fa-trash text-danger"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
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
                onClick={() => getCategoriesList(nameValue, 20, pageNo)}
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
      </div>
    </>
  );
}
