import { createContext, useContext, useState, useEffect } from "react";

//context
export const FetchContext = createContext();
//uso de context
export function useFetch() {
  const context = useContext(FetchContext);
  if (!context)
    throw new Error("useMovies must be used within a FetchContextProvider");
  return context;
}
//funcion porveedora de contexto
export function FetchProviders({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: 0, message: "" });

  //quita el mensaje de error de la pantalla
  useEffect(() => {
    if (error.message.length > 0) {
      const timeOutId = setTimeout(() => {
        setError({ status: 0, message: "" });
      }, 5000);
      return () => clearTimeout(timeOutId);
    }
  }, [error]);

  async function fetchData(request) {
    try {
      setLoading(true);
      const res = await fetch(request);
      const data = await res.json();
      if (!res.ok) throw { status: res.status, message: data[0].message };
      setLoading(false);
      return data;
    } catch (error) {
      setError({
        status: error.status,
        message: error.message,
      });
      return setLoading(false);
    }
  }

  return (
    <FetchContext.Provider value={{ fetchData, loading, error }}>
      {children}
    </FetchContext.Provider>
  );
}
