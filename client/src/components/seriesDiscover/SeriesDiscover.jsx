import { useEffect } from "react";

//react-router-dom
import { useSearchParams } from "react-router-dom";

//context
import { useSeries } from "../../context/SeriesContext";

//custom hook
import useInfiniteScrollHook from "../../customHook/useInfiniteScroll";

//componets
import DataContent from "../../components/dataContent/DataContent";

function SeriesDiscover() {
  const {
    seriesForTitle,
    getSeriesGenreName,
    getSeries,
    seriesData,
    sortSeries,
  } = useSeries();

  //custom hook
  const { targetToObserver } = useInfiniteScrollHook();

  //searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const genreIdSearchParams = searchParams.get("genreId");

  useEffect(() => {
    getSeries(1, genreIdSearchParams, sortSeries)
  }, [genreIdSearchParams, sortSeries]);

  //seteo de observer para scroll infinito
  useEffect(() => {
    if (seriesData.series.length) return targetToObserver();
  }, [seriesData]);

  return (
    <>
      <DataContent
        title={
          genreIdSearchParams
            ? getSeriesGenreName(genreIdSearchParams)
            : "Discover all"
        }
        type="series"
        data={
          seriesForTitle.data.length ? seriesForTitle.data : seriesData.series
        }
      />
    </>
  );
}

export default SeriesDiscover;
