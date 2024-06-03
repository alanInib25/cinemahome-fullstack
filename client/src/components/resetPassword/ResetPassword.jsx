//css
import "./resetPassword.css";
//
import { useParams, useNavigate } from "react-router-dom";
//context
import { useAuth } from "../../context/AuthContext";
//use-hook-form
import { useForm } from "react-hook-form";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { token } = useParams();

  const { auth, resetPassword } = useAuth();

  function onSubmit(data) {
    resetPassword(data, token);
    return navigate("/auth/signin");
  }

  return (
    <section className="resetPass">
      <form className="form resetPass" onClick={handleSubmit(onSubmit)}>
        <h2 className="form-title">Reset Password</h2>
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
                value: 20,
                message: "Max. 20 characters",
              },
            })}
          />
          <span className={`error-message ${auth}`}>
            {errors?.password && errors?.password.message}
          </span>
        </div>
        <button className="form-button">send</button>
      </form>
    </section>
  );
}

export default ResetPassword;
