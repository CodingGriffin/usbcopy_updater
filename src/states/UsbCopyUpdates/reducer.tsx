import actions from "./actions";

const initialState = {
  updates: [],
  loading: false,
  error: null,
};


function Reducer(state = initialState, action: any) {
  switch (action.type) {
    case actions.GET_UPDATES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.GET_UPDATES_SUCCESS:
      return {
        ...state,
        loading: false,
        updates: action.payload,
      };
    case actions.GET_UPDATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
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
        updates: action.payload,
      };
    case actions.ADD_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actions.DELETE_UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.DELETE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        updates: action.payload,
      };
    case actions.DELETE_UPDATE_FAILURE:
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
