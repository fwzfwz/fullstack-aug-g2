const DepartementReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return [];
  }
};

export default DepartementReducer;
