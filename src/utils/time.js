import moment from "moment";

export const test = (arr, values) =>{
return arr.map((x) =>
  x.flights.map((y) =>
    y.segments.map(
      (z) =>
        moment(z.fromDate + " " + z.fromTime).isAfter(
          moment(new Date(values.time[0].from[0]))
        ) ||
        moment(z.fromDate + " " + z.fromTime).isSame(
          moment(new Date(values.time[0].from[0]))
        )
    )
  )
)
.flat()
.flat()};

export const test2 = (arr, values) =>{
return arr.map((x) =>
  x.flights.map((y) =>
    y.segments.map(
      (z) =>
      moment(new Date(values.time[0].from[1]))
       .isAfter(
        moment(z.fromDate + " " + z.fromTime)
        ) ||
        moment(new Date(values.time[0].from[1]))
       .isSame(
        moment(z.fromDate + " " + z.fromTime)
        )
    )
  )
)
.flat()
.flat()};

export const test3 = (arr, values) =>{
return arr.map((x) =>
  x.flights.map((y) =>
    y.segments.map(
      (z) =>
      moment(z.toDate + " " + z.toTime)
       .isAfter(
        moment(new Date(values.time[0].to[0]))

        ) ||
        moment(z.toDate + " " + z.toTime)

       .isSame(
        moment(new Date(values.time[0].to[0]))

        )
    )
  )
)
.flat()
.flat()};

export const test4 =  (arr, values) =>{
return arr.map((x) =>
  x.flights.map((y) =>
    y.segments.map(
      (z) =>
      moment(new Date(values.time[0].to[1]))
       .isAfter(
        moment(z.toDate + " " + z.toTime)
        ) ||
        moment(new Date(values.time[0].to[1]))
       .isSame(
        moment(z.toDate + " " + z.toTime)
        )
    )
  )
)
.flat()
.flat()};