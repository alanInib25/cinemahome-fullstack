import { useEffect } from "react";
//context
import { useAuth } from "../../context/AuthContext";
//react-router-dom
import { Navigate, Link } from "react-router-dom";
//css
import "./home.css";

function Home() {
  const { isAuth } = useAuth();

  if (isAuth) return <Navigate to={"/dashboard"} replace />;

  return (
    <section className="home">
      <p className="home-text">
        Discover the best series and movies
        <Link className="home-signin" to="auth/signin">
          Sign In
        </Link>
      </p>
      <video
        className="home-video"
        src="../../../public/videos/home.mp4"
        autoPlay
        loop
        muted
      ></video>
    </section>
  );
}

export default Home;
