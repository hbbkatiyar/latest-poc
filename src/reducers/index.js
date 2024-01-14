import { ReducerUtils } from "../constants/reducers";

export default function reducer(state, action) {
  switch (action.type) {
    case ReducerUtils.product.details:
      return {
        ...state,
        productDetails: action.payload,
      };

    default:
      return state;
  }
}
