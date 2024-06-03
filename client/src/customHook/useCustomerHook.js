import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useSeeMoreTextHook(text) {
  const [seeMoreText, setSeeMoreText] = useState(false);
  const moreText = !seeMoreText ? text.substring(0, 350) : text;
  const seeMoreTextView = () => setSeeMoreText(!seeMoreText);
  return {
    seeMoreText,
    moreText,
    seeMoreTextView,
  };
}

export function useSeeMoreHook(data) {
  const [amount, setAmount] = useState(5);
  const dataAmount = data.slice(0, `${amount}`);
  const showMore = () => setAmount(amount + 5);
  return {
    dataAmount,
    showMore,
    amount,
  };
}

export function useRunTimeHook(runtimeData) {
  const hour = Math.floor(runtimeData / 60);
  const min = Math.floor(runtimeData % 60);
  return `${hour}h ${min}m`;
}

export function useQueryParamsHook(key, value) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sp = new URLSearchParams(searchParams);
  value === null ? sp.delete(key) : sp.set(key, value);
  return `?${sp.toString()}`;
}
/* export function useQueryParamsHook(key, value) {
  const [searchParams, setSearchParams] = useSearchParams();
  setSearchParams((prevSp) =>{
   if(value === null) prevSp.delete(key);
   else {prevSp.set(key, value)}
   return prevSp
  } )
} */

//valida url de la imagen
export function useImageUrlValidationHook(item) {
  return item.poster_path && item.poster_path !== null
    ? item.poster_path
    : item.profile_path && item.profile_path !== null
    ? item.profile_path
    : false;
}
