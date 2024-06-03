export const peopleReducer = (state, action) => {
  switch (action.type) {
    case "PEOPLE_DATA": {
      const { data, page } = action.payload;
      const prevData = state.peopleData.people;
      return {
        ...state,
        peopleData: {
          people: [...prevData, ...data],
          pagePeople: page,
        },
      };
    }
    case "PEOPLE_DETAIL": {
      return {
        ...state,
        peopleDetail: action.payload,
      };
    }
    default: {
      break;
    }
  }
};
