import actions from "./actions";

const initialState = {
  updates: [],
  order: {
    data: null
  },
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.ADD_UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.ADD_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case actions.ADD_UPDATE_FAILURE:
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
