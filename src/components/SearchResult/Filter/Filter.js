import React from "react";
import "./Filter.scss";
import { Category } from "./Category";
import {
  PriceRange,
  DateRangeWithPlane,
  TimeRange,
  TimeRangeWithPlane,
} from "./Range";
import { useSelector, useDispatch } from "react-redux";
import { filterFlights } from "../../../store/slices/FligthsSlice";
import CheckboxList from "./CheckboxList";
import Checkbox from "../../shared/Checkbox";

export function Filter() {
  const { filter } = useSelector((x) => x.flights);
  const dispatch = useDispatch();

  const memoizedAirports = React.useMemo(
    () =>
      filter?.airports?.map(({ label, airports }) => {
        return {
          name: label,
          values: airports?.map((el) => {
            return { value: el.code, label: el.name, checked: el.checked };
          }),
        };
      }),
    [filter]
  );

  const flightTypes = [
    {
      value: "Regular",
      label: "Регулярные рейсы",
      checked: filter?.values?.flightTypes.includes("Regular"),
    },
    {
      value: "Charter",
      label: "Чартерные рейсы",
      checked: filter?.values?.flightTypes.includes("Charter"),
    },
  ];



  return !!filter ? (
    <div className="fs-filter">
      <Category name="Цена билета">
        <PriceRange
          onChange={(value) =>
            dispatch(filterFlights({ type: "price", value }))
          }
          value={filter.values.prices}
          max={filter.prices.max}
          min={filter.prices.min}
        />
      </Category>
      <Category name="Пересадки">
        <Checkbox type="squar" label="Без пересадок" />
      </Category>
      <Category name="Тип рейса">
      <CheckboxList>

        {flightTypes.map((x,key) => (
          <Checkbox value={x.value} key={key} label={x.label} type="squar" checked={x.checked} onChange={(e) => {
            dispatch(
              filterFlights({
                type: "flightType",
                code: e.target.value,
                checked: e.target.checked,
              })
            );
          }}/>
        ))} 
                </CheckboxList>

      </Category>
      <Category name="Багаж">
        <CheckboxList>
          {filter.baggage.map((x, key) => (
            <Checkbox
              key={key}
              value={x.value}
              checked={filter.values.baggage.includes(x.value)}
              onChange={(e) => {
                dispatch(
                  filterFlights({
                    type: "baggage",
                    value: parseInt(e.target.value),
                    checked: e.target.checked,
                  })
                );
              }}
              type="squar"
              label={x.label}
            />
          ))}
        </CheckboxList>
      </Category>
      <Category name="Время вылета и прибытия">
        {filter.time.map((x, key) => (
          <DateRangeWithPlane
            key={key}
            from={x.from}
            to={x.to}
            fromValue={filter.values.time[key].from}
            toValue={filter.values.time[key].to}
            onChange={(direction, value) =>
              dispatch(filterFlights({ type: "time", direction, key, value }))
            }
          />
        ))}
      </Category>
      <Category name="Аэропорты">
        <CheckboxList>
          {memoizedAirports.map((x) => (
            <>
              <div style={{marginBottom:10}}>{x.name}</div>
              {x.values.map((value, index) => (
                <Checkbox
                  key={index}
                  value={value.value}
                  checked={filter?.values?.airports?.includes(value.value)}
                  type="squar"
                  label={value.label}
                  onChange={(e) => {
                    dispatch(
                      filterFlights({
                        type: "airports",
                        code: e.target.value,
                        checked: e.target.checked,
                      })
                    );
                  }}
                />
              ))}
            </>
          ))}
        </CheckboxList>
      </Category>
      <Category name="Авиакомпании">
        <CheckboxList>
          {filter.airlines.map((x, key) => (
            <Checkbox
              key={key}
              value={x.code}
              checked={filter.values.airlines.includes(x.code)}
              onChange={(e) => {
                dispatch(
                  filterFlights({
                    type: "airlines",
                    code: e.target.value,
                    checked: e.target.checked,
                  })
                );
              }}
              type="squar"
              icon={x.icon}
              label={x.name}
            />
          ))}
        </CheckboxList>
      </Category>
      <Category name="Длительность пересадки">
        <TimeRange
          min={filter.transferDuration.min}
          max={filter.transferDuration.max}
          value={filter.values.transferDuration}
          onAfterChange={(value) =>
            dispatch(filterFlights({ type: "transferDuration", value }))
          }
        />
      </Category>
      <Category name="Время в пути">
        {filter.flightsDurations.map((props, key) => {
          return (
            <TimeRangeWithPlane
              key={key}
              {...props}
              value={filter.values.flightsDurations[key]}
              onAfterChange={(value) =>
                dispatch(
                  filterFlights({ type: "flightsDurations", key, value })
                )
              }
            />
          );
        })}
      </Category>
    </div>
  ) : null;
}
