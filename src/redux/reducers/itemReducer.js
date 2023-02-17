
// import { actionTypes } from "../contants/action-types";

// const initialState = {
//     errorMessage: "",
//     loading: false,
//     items: []
// };

// const itemReducer = (state = initialState, { payload }) => {
//     switch (actionTypes) {
//         case actionTypes.GET_PRODUCTS:
//             return { ...state, items: payload, loading: false };
//         case actionTypes.ADD_PRODUCTS:
//             return {
//                 ...state, items: [payload, ...state.items],
//                 loading: false
//             };
//         case actionTypes.UPDATE_PRODUCTS:
//             return {
//                 ...state, items: [payload, ...state.items],
//                 loading: false
//             };
//         case actionTypes.DELETE_PRODUCTS:
//             return {
//                 ...state,
//                 items: state.items.filter((user) => user.id !== payload.id),
//                 loading: false
//             };
//         default:
//             return state;
//     }
// };
// export default itemReducer;
