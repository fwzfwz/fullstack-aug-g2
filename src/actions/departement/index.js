import db from '../../firebase';

const setDepartement = () => {
  return async (dispatch, getState) => {
    let departementList = [];
    await db
      .collection('departements')
      .get()
      .then(departements =>
        departements.forEach(departement => {
          let dept = {};
          dept.id = departement.id;
          dept.name = departement.data().name;
          departementList.push(dept);
        })
      );
      dispatch(setDepartements(departementList));
  };
};

const setDepartements = payload => {
  return {
    type: 'SET',
    payload,
  };
};

export default setDepartement;
