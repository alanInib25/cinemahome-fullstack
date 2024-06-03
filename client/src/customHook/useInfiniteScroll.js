import { useState, useEffect } from "react";

//context movie
import { useMovies } from "../context/MoviesContext";
import { useSeries } from "../context/SeriesContext";
import { usePeople } from "../context/PeopleContext";

//react-router-dom
import { useLocation, useSearchParams } from "react-router-dom";

const observerOptions = { rootMargin: "0px 0px 200px 0px", threshold: 0 };

export default function useInfiniteScrollHook() {
  const [target, setTarget] = useState(null);
  const { pathname } = useLocation();

  //searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const genreIdSearchParams = searchParams.get("genreId");

  //use movie context
  const { moviesData, getMovies, sortMovies } = useMovies();

  //use series context
  const { seriesData, getSeries, sortSeries } = useSeries();

  //use people context
  const { getPeople, peopleData } = usePeople();

  //IntersectionObserver
  const observer = new IntersectionObserver(callback, observerOptions);

  /*
  se le entrega el objetivo a observar. 
  Se pasa filter como dependencia ya que al cambiar el valor de filter el observador se queda con el parametro antiguo y no el nuevo valor
  */
  useEffect(() => {
    if (target !== null) observerIntersection(target);
    return () =>{
      observer.disconnect()
    };
  }, [target, genreIdSearchParams, sortMovies, sortSeries]);

  function requestMoreData() {
    switch (pathname) {
      case "/movies": {
        getMovies(moviesData.pageData + 1, genreIdSearchParams, sortMovies);
        break;
      }
      case "/series": {
        getSeries(seriesData.pageData + 1, genreIdSearchParams, sortSeries);
        break;
      }
      case "/celebrities": {
        getPeople(peopleData.pagePeople + 1);
        break;
      }
      default: {
        break;
      }
    }
  }

  //funcion de observador
  function callback(entradas, observer) {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        requestMoreData();
        observer.unobserve(entrada.target);
        return;
      }
    });
  }

  //se establece observerIntersection para scrolll infinito
  function observerIntersection(target) {
    return observer.observe(target);
  }

  //funcion usada por componente para setear el estado target
  function targetToObserver() {
    const elements = document.querySelectorAll(".dataContent-item");
    return setTarget(elements[elements.length - 1]);
  }

  return { targetToObserver };
}
