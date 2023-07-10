import React from "react";
import "./FlightsList.scss";
import getFeatureIcon from "./featureIcon";
import {
  getAirlineLogo,
  formatDuration,
  pluralWord,
  formatDate,
  formatPrice,
} from "../../../../utils";
import planeSrc from "../../../../assets/media/flight-search/plane.svg";
import Point from "../../../shared/FlightPoint";
import BaggageIcon from "./BaggageIcon";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getUrlRequest, getUrlSuccess } from "../../../../store/booking/slices";
import { useMediaQuery } from 'react-responsive';
import Tooltip from "@mui/material/Tooltip"

export default function (props) {
  // const modules = useSelector((x) => x.router.modules);
  const dispatch = useDispatch();
  const url = useSelector((x) => x?.booking?.getUrl);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // const handleClick = (x) => {
  //   if(modules.includes('booking')) {
  //     e.preventDefault();
  //     dispatch(push({path: 'booking',meta: {searchId: x.searchId,groupIndex: x.groupIndex,flights:x.flights.map(y=> y.index) } }));
  //   }
  //   // } else {
  //   //   const url = `http://tvm-docker-01:28512/booking/${x.searchId}/?group=${x.groupIndex}&${x.flights.map(x=> `flights=${x.index}`).join('&')}`
  //   //   window.history.pushState({},'',url)
  //   // }
  // }

  const newHandle = React.useCallback(( x, i) => {
    dispatch(getUrlRequest({ id: x.searchId, index: i }));
  }, [url]);

  React.useEffect(() => {
    if (url) {
      window.open(url, "_blank").focus();
      dispatch(getUrlSuccess({url: ""}))
    }
  }, [newHandle, url]);

console.log(props);

  return (
    <div className="fs-search-flight-list">
      {props.items.map((x, i) => {
        return (
          <div className="fs-search-flight-item" key={x.id}>
            <div className="fs-search-flight-item__right-side" onClick={() => isMobile ? newHandle(x, i) : null}>
              <div className="fs-search-flight-item__right-side__head">
                <div>
                  {x.airlinesInfo
                    .slice(0, 2)
                    .map((airline) =>
                      airline.code ? (
                        <img
                          width={80}
                          height={30}
                          src={getAirlineLogo(airline.code, 160, 60, true)}
                          alt={airline.name}
                        />
                      ) : (
                        <span>{airline.name}</span>
                      )
                    )}
                  {x.airlinesInfo.length > 2 && (
                    <div>
                      <span>{`+${airlinesInfo.length - 2}`}</span>
                    </div>
                  )}
                </div>
                <div className="fs-search-flight-item__right-side__head__right">
                  {x.flights.length === 1 && (
                    <div
                      className="fs-search-flight-item__right-side__head__right__flight-type"
                      style={{
                        background:
                          x.flight_Type === "Charter" ? "#FFF3CD" : "#E3EAFF" ,
                      }}
                    >
                      <img src={planeSrc} />
                      <span>
                        {x.flight_Type === "Charter"
                          ? "Чартерный"
                          : "Регулярный"}
                      </span>
                    </div>
                  )}
                  {x.features.map(getFeatureIcon)}
                </div>
              </div>
              <div className="fs-search-flight-group-list">
                {x.flights.map((y, key, arr) => {
                  const firstSegment = y.segments[0];
                  const lastSegment = y.segments[y.segments.length - 1];

                  const fromDate = new Date(
                    `${firstSegment.fromDate} ${firstSegment.fromTime}`
                  );
                  const toDate = new Date(
                    `${lastSegment.toDate} ${lastSegment.toTime}`
                  );

                  const stopString =
                    y.stops.length > 0
                      ? `${y.stops.length} ${pluralWord(
                          y.stops.length,
                          "пересадка",
                          "пересадки",
                          "пересадок"
                        )}`
                      : "прямой";

                  return (
                    <div key={key}>
                      <div className="fs-search-flight-group-head">
                        <span className="fs-search-flight-group-head__title">
                          {key === 1 ? "Обратно" : "Туда"}: {y.from.city} —{" "}
                          {y.to.city}
                        </span>
                        {/* <div
                          className="fs-search-flight-item__right-side__head__right__flight-type"
                          style={{
                            background:
                              x.flight_Type === "Regular"
                                ? "#E3EAFF"
                                : "#FFF3CD",
                          }}
                        >
                          <img src={planeSrc} />
                          <span>
                            {x.flight_Type === "Regular"
                              ? " Регулярный"
                              : "Чартерный"}
                          </span>
                        </div> */}
                      </div>
                      <div>
                        <div>
                          <div className="fs-search-flight-group-desc-first">
                            <span className="fs-search-flight-group-desc-first__text">
                              {format(fromDate, "HH:mm")}
                            </span>
                            <div className="fs-search-flight-group-desc-first__progress-line">
                              <div className="fs-search-flight-group-desc-first__progress-line__line">
                                <div className="fs-search-flight-group-desc-first__progress-line__line__points">
                                  <Point />
                                  <Point />
                                </div>
                              </div>
                            </div>
                            <span className="fs-search-flight-group-desc-first__text">
                              {format(toDate, "HH:mm")}
                            </span>
                          </div>
                          <div className="fs-search-flight-group-desc-second">
                            <div class="fs-search-flight-group-desc-second__point">
                              <span class="sc-eVmaCL hOsGig">
                                <strong>{y.from.code}</strong> {y.from.airport}
                              </span>
                              <span class="sc-eVmaCL hOsGig">
                                {formatDate(fromDate, "dd LLLL yyyy, EEEEEE")}
                              </span>
                            </div>
                            <span className="fs-search-flight-group-desc-second__duration">
                              В пути: {formatDuration(y.duration)},{" "}
                              <span>{stopString}</span>{" "}
                            </span>
                            <div class="fs-search-flight-group-desc-second__point">
                              <span class="sc-eVmaCL hOsGig">
                                <strong>{y.to.code}</strong> {y.to.airport}
                              </span>
                              <span class="sc-eVmaCL hOsGig">
                                {formatDate(toDate, "dd LLLL yyyy, EEEEEE")}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* {props.airlines.map((x, key) => (
                        <CompanyLogoMobile key={key}>
                          <Image
                            src={Helper.getAirlinesLogoUrl(x.operatingAirlineCode, 65, 65)}
                            alt={x.operatingAirlineName}
                          />{' '}
                          <LogoDescription>{x.operatingAirlineName}</LogoDescription>
                        </CompanyLogoMobile>
                      ))} */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="fs-search-flight-item__left-side">
              <Tooltip title={x.baggage.value > 0 ? `Багаж ${x.baggage.value}` : "Багажа нет"}>
                <div>
              <BaggageIcon
                className="fs-search-flight-item__left-side__baggage"
                value={
                  x.baggage
                    ? x.baggage.value > 0
                      ? x.baggage.value
                      : undefined
                    : "?"
                }
              />

              </div>
              </Tooltip>

              <div
                className="fs-search-flight-item__left-side__link"
                target="_blank"
                onClick={() => newHandle( x, i)}
                // href={url}
              >
                Купить за {formatPrice(x.prices[0])}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
