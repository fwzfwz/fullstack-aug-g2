const KaryawansReducer = (state = [], action) => {
  console.log('asdas', action.payload);
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return [];
  }
};

export default KaryawansReducer;
