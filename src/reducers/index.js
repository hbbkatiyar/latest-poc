import { ReducerUtils } from "../constants/reducers";

export default function reducer(state, action) {
  switch (action.type) {
    case ReducerUtils.vehicle.details:
      return {
        ...state,
        vehicleDetails: action.payload,
      };

    case ReducerUtils.vehicle.makes:
      return {
        ...state,
        makes: action.payload,
      };

    case ReducerUtils.vehicle.models:
      return {
        ...state,
        models: action.payload,
      };

    case ReducerUtils.vehicle.variants:
      return {
        ...state,
        variants: action.payload,
      };

    case ReducerUtils.order.details:
      return {
        ...state,
        orderDetails: action.payload,
      };
    
    case ReducerUtils.products.config:
      return {
        ...state,
        productConfig: action.payload,
      };

    case ReducerUtils.system.config:
      return {
        ...state,
        systemConfig: action.payload,
      };
    
    case ReducerUtils.provisionalQuotes.list:
      return {
        ...state,
        provisionalQuotes: action.payload,
      };
    
      case ReducerUtils.product.details:
        return {
          ...state,
          productDetails: action.payload,
        };

    default:
      return state;
  }
}
