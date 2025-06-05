import actions from "./actions";

const initialState = {
  orders: [],
  order: {
    data: null
  },
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_ORDERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case actions.GET_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.GET_ORDER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case actions.GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default Reducer;
