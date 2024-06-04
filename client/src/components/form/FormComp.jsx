import { useEffect } from "react";

//css
import "./form.css";

//react-router-dom
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";

//react-hook-form
import { useForm } from "react-hook-form";

//context
import { useAuth } from "../../context/AuthContext.jsx";

function FormComp() {
  const { signupUser, signinUser, isAuth } = useAuth();
  const navigate = useNavigate();
  const { auth } = useParams();
  const isSignin = auth === "signin" ? true : false;

  //valida si usuario esta autenticado
  if (isAuth){
    <Navigate to="/dashboard" replace />
  };

  //use react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  async function onSubmit(user) {
    if (auth === "signup") {
      signupUser(user);
      reset();
      return navigate("/auth/signin");
    } else {
      signinUser(user);
      reset();
      return navigate("/dashboard");;
    }
  }

  useEffect(() => {
    clearErrors("username");
    clearErrors("email");
    clearErrors("password");
    reset();
  }, [auth]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`form ${auth}`}>
      <h2 className="form-title">{isSignin ? "Sign In" : "Sign Up"}</h2>
      {!isSignin && (
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username..."
            className={`form-input ${auth}`}
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              minLength: {
                value: 2,
                message: "Min. 3 characters",
              },
              maxLength: {
                value: 15,
                message: "Max. 20 characters",
              },
            })}
          />
          <span className={`error-message ${auth}`}>
            {errors?.username && errors?.username.message}
          </span>
        </div>
      )}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          placeholder="Email..."
          className={`form-input ${auth}`}
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Email bad format",
            },
          })}
        />
        <span className={`error-message ${auth}`}>
          {errors?.email && errors?.email.message}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password..."
          className={`form-input ${auth}`}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 6,
              message: "Min. 6 characters",
            },
            maxLength: {
              value: 12,
              message: "Max. 20 characters",
            },
          })}
        />
        <span className={`error-message ${auth}`}>
          {errors?.password && errors?.password.message}
        </span>
      </div>
      {isSignin && (
        <p className="forgotPassword-message">
          Forgot Password?
          <Link className="forgotPassword-link" to="/auth/forgotPassword">
            Here
          </Link>
        </p>
      )}
      <p className="account-message">
        {isSignin ? (
          <>
            Don´t have account? <Link className="account-link signup" to="/auth/signup">Sing Up</Link>
          </>
        ) : (
          <>
            Have an account? <Link className="account-link signin" to="/auth/signin">Sing In</Link>
          </>
        )}
      </p>
      <button className={`form-button ${isSignin ? "signin" : "signup"}`}>
        {isSignin ? "Signin" : "Signup"}
      </button>
    </form>
  );
}

export default FormComp;
