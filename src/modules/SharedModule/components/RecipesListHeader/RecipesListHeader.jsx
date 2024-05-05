import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesListHeader() {
  const navigate = useNavigate();
  const goToReceipesList = () => {
    navigate("/dashboard/recipes");
  };
  return (
    <div className="recipeheadercontainer p-3 m-4">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div>
            <h5>
              Fill the <span className="text-success">Recipes !</span>{" "}
            </h5>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <div>
            <button onClick={goToReceipesList} className="btn btn-success">
              All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
