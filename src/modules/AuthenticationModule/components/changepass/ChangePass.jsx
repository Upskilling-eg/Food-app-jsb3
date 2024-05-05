import React from "react";
import logo from "../../../../assets/images/logo.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ChangePass({ logout }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      logout();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="text-center">
            <img src={logo} alt="" className="logo w-100" />
          </div>
          <div className="form-content">
            <h3>Change Your Password</h3>
            <p className="text-muted">Enter your details below</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your oldPassword"
                  {...register("oldPassword", {
                    required: "Password is required",
                  })}
                />
              </div>
              {errors.oldPassword && (
                <p className="alert alert-danger py-1">
                  {errors.oldPassword.message}
                </p>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your New Password"
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                />
              </div>
              {errors.newPassword && (
                <p className="alert alert-danger py-1">
                  {errors.newPassword.message}
                </p>
              )}

              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-key"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm new password"
                  {...register("confirmNewPassword", {
                    required: "confirmNewPassword is required",
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="alert alert-danger py-1">
                  {errors.confirmNewPassword.message}
                </p>
              )}

              <button className="btn btn-success w-100">Chnage Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
