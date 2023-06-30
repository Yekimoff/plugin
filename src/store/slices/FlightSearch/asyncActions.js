

export function loadFlights() {
  return async (dispatch, getState, api) => {
    dispatch(flightSearchRequest());
    dispatch(push({path: 'search'}));
    try{
      const {passengers,cityFrom,cityTo,flightClass,firstDate,secondDate} = getState().flights.searchParams;
      const {filter,...result} = await api.fetchFlights({passengers,cityFrom,cityTo,flightClass,firstDate,secondDate} );
      dispatch(flightSearchSuccess(result));
      dispatch(initializeFilter(filter));
    } catch(e) {
      console.log(e);
      dispatch(flightSearchFailure(e));
    }
  }
}

export function filterFlights(payload) {
  return async (dispatch, getState, api) => {
    try{
      const items = getState().flights.result.data.flightsList.notFilteredItems;
      const values = {...getState().flights.filter.values};

      switch(payload.type) {
        case 'price':
          values.prices = [...payload.value];
          break;
        case 'flightsDurations': {
          let clone = [...values.flightsDurations];
          clone[payload.key] = [...payload.value];
          values.flightsDurations = clone;
          break;
        }
        case 'time': {
          let clone = [...values.time];
          let clone2 = {...clone[payload.key]}
          clone2[payload.direction] = [...payload.value];
          clone[payload.key] = clone2;
          values.time = clone;
          break;
        }
        case 'airlines': {
          if(payload.checked) {
            values.airlines = Array.from(new Set([...values.airlines,payload.code]));
          } else {
            values.airlines = values.airlines.filter(x => x !== payload.code);
          }
          break;
        }
        case 'baggage': {
          if(payload.checked) {
            values.baggage = Array.from(new Set([...values.baggage,payload.value]));
          } else {
            values.baggage = values.baggage.filter(x => x !== payload.value);
          }
          break;
        }
      }

      dispatch(setValues(values));

      let nextItems = items
        .filter(x => x.prices[0] >= values.prices[0] && x.prices[0] <= values.prices[1])
        .filter(x => x.flights.reduce((acc,y,key) =>acc && (y.duration >= values.flightsDurations[key][0] && y.duration <= values.flightsDurations[key][1]) ,true))
        .filter(x => x.flights.reduce((acc,y,key)=> {
          return acc;
        },true))


      if(values.airlines.length > 0) {
        nextItems = nextItems.filter(x => !!x.airlinesInfo.find(x => values.airlines.includes(x.code)))
      }
      
      if(values.baggage.length !== 0 || values.baggage.length !== 2) {
        const t = values.baggage[0];
        if(t === 0) {
          nextItems = nextItems.filter(x => x.baggage === null || x.baggage.value === null);
        } else {
          nextItems = nextItems.filter(x => x.baggage === null || x.baggage.value !== null);
        } 
      }

      dispatch(setFlights(nextItems));      
    } catch(e) {
      console.log(e);
    }
  }
}