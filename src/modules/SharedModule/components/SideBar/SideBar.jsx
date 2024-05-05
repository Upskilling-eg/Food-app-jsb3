import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import toggler from "../../../../assets/images/3.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePass from "../../../AuthenticationModule/components/changepass/ChangePass";

export default function SideBar({ loginData }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass logout={logout} />
        </Modal.Body>
      </Modal>
      <div className="sidebar-container">
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <MenuItem
              onClick={toggleCollapse}
              icon={<img src={toggler} alt="" />}
            ></MenuItem>

            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-home" aria-hidden="true"></i>}
                component={<Link to="/dashboard/users" />}
              >
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>

            {loginData?.userGroup == "SystemUser" ? (
              <MenuItem
                icon={<i className="fa fa-home" aria-hidden="true"></i>}
                component={<Link to="/dashboard/favs" />}
              >
                Favs
              </MenuItem>
            ) : (
              ""
            )}

            {loginData?.userGroup == "SuperAdmin" ? (
              <MenuItem
                icon={<i className="fa fa-home" aria-hidden="true"></i>}
                component={<Link to="/dashboard/categories" />}
              >
                Categories
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              onClick={handleShow}
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<i className="fa fa-sign-out" aria-hidden="true"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* <button onClick={logout} className="btn btn-danger">
        logout
      </button> */}
      </div>
    </>
  );
}
