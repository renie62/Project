export const INITIAL_STATE = {
  title: "",
  category: "",
  desc: "",
  oldPrice: 0,
  price: 0,
  images: [],
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        images: action.payload.images,
      };
    default:
      return state;
  }
};
