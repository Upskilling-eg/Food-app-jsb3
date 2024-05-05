import React, { useEffect } from "react";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const appendToFormData = (data) => {
    let formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    return formData;
  };

  const onSubmit = async (data) => {
    let registerFormData = appendToFormData(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        registerFormData
      );
      console.log(response);
      navigate("/verifyAccount");
    } catch (error) {
      console.log(error);

      // toast.error(error.response.data.message, { position: "top-left" });
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid vh-100 bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white p-4 border border-3">
            <div className="text-center">
              <img src={logo} alt="" className="logo w-25" />
            </div>
            <div className="form-content">
              <h3>Register</h3>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your user name"
                        {...register("userName", {
                          required: "userName is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="alert alert-danger p-2">
                        {errors.userName.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-1">
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
                      <p className="alert alert-danger p-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your country"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="alert alert-danger p-2">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your phone number"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="alert alert-danger p-2">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="alert alert-danger p-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <div className="input-group mb-1">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa fa-key"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your confirm password"
                        {...register("confirmPassword", {
                          required: "confirmPassword is required",
                        })}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="alert alert-danger p-2">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="input-group mb-1">
                      <input
                        type="file"
                        className="form-control"
                        {...register("profileImage", {
                          required: "profileImage is required",
                        })}
                      />
                    </div>
                    {errors.profileImage && (
                      <p className="alert alert-danger p-2">
                        {errors.profileImage.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="links d-flex justify-content-end my-3">
                  <Link to="/login">Login</Link>
                </div>

                <button className="btn btn-success w-100">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
