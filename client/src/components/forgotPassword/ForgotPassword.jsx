import { useEffect } from "react";

//react-hook-form
import { useForm } from "react-hook-form";
//css
import "./forgotPass.css";

//context
import { useAuth } from "../../context/AuthContext";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { forgotPassword } = useAuth();

  function onSubmit(data) {
    console.log(data);
    forgotPassword(data);
  }

  return (
    <section className="forgotPass">
      <form className="form forgotPass" onClick={handleSubmit(onSubmit)}>
        <h2 className="form-title">Forgot Password</h2>
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
            className="form-input"
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
          <span className="error-message">
            {errors?.email && errors?.email.message}
          </span>
        </div>
        <button className="form-button">send</button>
      </form>
    </section>
  );
}

export default ForgotPassword;
