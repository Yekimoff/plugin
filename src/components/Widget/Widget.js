import React from "react";
import "../../assets/styles/index.scss";
import "rc-slider/assets/index.css";
import "./Widget.scss";
import SearchForm from "../searchForm";
import SearchResult from "../SearchResult";
import Booking from "../Booking";
import { useDispatch, useSelector } from "react-redux";
import { init } from "../../store/slices/routerSlice";
import "reactjs-popup/dist/index.css";
import AboutUsBanner from "../Statics/AboutUsBanner";
import Footer from "../Statics/Footer";
import HowToBook from "../Statics/HowToBook";
import PaymentInfo from "../Statics/PaymentInfo";
import Services from "../Statics/Services"
import InsuranceService from "../Statics/InsuranceService"; 
import RefundAndExchange from "../Statics/RefundAndExchange"; 
import UserAgreement from "../Statics/UserAgreement"; 





export default function Widget(props) {
  const dispatch = useDispatch();
  const location = useSelector((x) => x.router.location);
  const [chosenStaticPage, setChosenStaticPage] = React.useState(null);
  const [tokenData, setTokenData] = React.useState("")
  const flights = useSelector((x) => x.flights.result);
  React.useEffect(() => {
    dispatch(init(window["fs-flight-search-widget-config"].modules));
  }, []);

  let module = null;
  switch (location.path) {
    case "search":
      module = <SearchResult />;
      break;
    case "booking":
      module = <Booking />;
  }

  console.log(tokenData, "tokenData")


  return (
    <div className="fs-widget">
      <input style={{width:200,height:30}} onChange={(e) => setTokenData(e.target.value)} ></input>
      <SearchForm setChosenStaticPage={setChosenStaticPage} tokenData={tokenData}/>
      {!chosenStaticPage ? module : chosenStaticPage === "booking" ? <HowToBook /> : chosenStaticPage === "payment" ?  <PaymentInfo /> : chosenStaticPage === "services" ?  <Services /> : chosenStaticPage === "insurance" ?  <InsuranceService /> : chosenStaticPage === "refundExchange" ?  <RefundAndExchange /> : <UserAgreement />}
      {!chosenStaticPage && !flights?.data && <AboutUsBanner />}

      <Footer setChosenStaticPage={setChosenStaticPage} />
    </div>
  );
}
