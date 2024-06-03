import { useEffect } from "react";
//css
import "./auth.css";
//components
import FormComp from "../../components/form/FormComp";
//context
import { useFetch } from "../../context/FetchContext";
import { useAuth } from "../../context/AuthContext";
//react router dom
import { Navigate } from "react-router-dom";

function Auth() {
  const { error } = useFetch();
  const { isAuth } = useAuth();
  //valida si usuario esta autenticado
  if (isAuth){
    return <Navigate to="/dashboard" replace />;
  };

  return (
    <section className="auth">
      <article className="auth-container">
        {error.message.length > 0 && (
          <span className="message-text">{error.message}</span>
        )}
        <FormComp />
      </article>
    </section>
  );
}

export default Auth;
