import React, { useEffect } from "react";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyAccount() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
  
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  return (
    <div>
      {" "}
      <div className="auth-container">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-5 bg-white p-4 border border-3">
              <div className="text-center">
                <img src={logo} alt="" className="logo w-25" />
              </div>
              <div className="form-content">
                <h3>Verify Account</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your password"
                      {...register("code", {
                        required: "code is required",
                      })}
                    />
                  </div>
                  {errors.code && (
                    <p className="alert alert-danger">{errors.code.message}</p>
                  )}

                  <button className="btn btn-success w-100">Verify</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
