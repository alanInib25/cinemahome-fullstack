import { createContext, useContext, useState, useReducer } from "react";

//API
import {
  getPeopleRequest,
  getPeopleDetailRequest,
} from "../api/peopleRequest.js";

//reducer
import { peopleReducer } from "../reducers/peopleReducer.js";

//context
import { useFetch } from "./FetchContext.jsx";

export const PeopleContext = createContext();

export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context)
    throw new Error("useMovies must be used within a MoviesProviders");
  return context;
};

//initial state
const initialStatePeople = {
  peopleData: {
    people: [],
    pagePeople: 0,
  },
  peopleDetail: {},
};

export function PeopleProviders({ children }) {
  const [state, dispatch] = useReducer(peopleReducer, initialStatePeople);
  const { fetchData } = useFetch();

  async function getPeople(page) {
    fetchData(getPeopleRequest(page)).then(({ results, page }) =>
      dispatch({ type: "PEOPLE_DATA", payload: { data: results, page } })
    );
  }

  async function getPeopleDetail(id) {
    fetchData(getPeopleDetailRequest(id)).then((data) =>
      dispatch({ type: "PEOPLE_DETAIL", payload: data })
    );
  }

  return (
    <PeopleContext.Provider
      value={{
        ...state,
        getPeople,
        getPeopleDetail,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
}
