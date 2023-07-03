import React from "react";
import CityField from "../CityField";
import Passengers from "../Passengers";
import Calendar from "../DatePicker";
import "./SearchForm.scss";
import { useSelector, useDispatch } from "react-redux";
import { changeCity, loadFlights } from "../../../store/slices/FligthsSlice";
import { useFocus } from "../useFormFocus";
import infoIcon from "../../../assets/media/infoIcon.svg";
import styled from "styled-components";
import StaticContainer from "../../Statics/StaticContainer";

const Title = styled.span`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #2e2e32;
  margin: 20px 0 20px 0;
  display: block;
`;

const Flex = styled.div`
display:flex;
align-items:center;
font-size: 14px;
line-height: 20px;
font-family:Open sans;
color: #4872F2;
margin-top:5px;
width:200px;
cursor:pointer;
position:relative;
`;

const InfoIcon = styled.img.attrs({ src: infoIcon })`
  margin-right: 5px;
`;

export default function SearchForm(props) {
  const { cityFrom, cityTo } = useSelector((x) => x.flights.searchParams);
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const { setFocus, focus } = useFocus();

  const isFocusActive = React.useMemo(() => !!focus, [focus]);

  const [isOpen,setIsOpen] = React.useState(false)



  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current) {
        if (!ref.current.contains(e.target)) {
          setFocus(null);
        }
      }
    };

    if (!isFocusActive) {
      document.removeEventListener("mousedown", handleClickOutside);
    } else {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocusActive]);


  return (
    <>
      <form
        className="fs-search-form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(loadFlights({tokenData: props.tokenData}));
          setFocus(null);
          props.setChosenStaticPage(null);
        }}
        ref={ref}
      >
        <Title>Авиабилеты в любую точку мира</Title>

        <div className="fs-search-form__inputs">
          <CityField
            onChange={(value) =>
              dispatch(changeCity({ direction: "From", value }))
            }
            value={cityFrom}
            type="text"
            label="Город вылета"
          />
          <CityField
            onChange={(value) =>
              dispatch(changeCity({ direction: "To", value }))
            }
            value={cityTo}
            type="text"
            label="Город прилета"
          />
          <Calendar />
          <Passengers />
          <button className="fs-search-form__button" type="submit">
            Найти
          </button>
        </div>
        <Flex onClick={() => setIsOpen(!isOpen)}>
          <InfoIcon />
          Полезная информация
        </Flex>
        {isOpen && <StaticContainer setChosenStaticPage={props.setChosenStaticPage} setIsOpen={setIsOpen}/>}

      </form>
    </>
  );
}
