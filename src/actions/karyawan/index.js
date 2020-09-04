import db from '../../firebase';

const setKaryawan = () => {
  return async (dispatch, getState) => {
    let karyawanList = [];
    await db
      .collection('karyawans')
      .get()
      .then(karyawans => {
        karyawans.forEach(karyawan => {
          let kar = karyawan.data();
          kar.id = karyawan.id;
          db.collection('departements')
            .doc(kar.departement_id)
            .get()
            .then(
              departement => (kar.departement_name = departement.data().name)
            );
          karyawanList.push(kar);
        });
      });
    dispatch(setKaryawans(karyawanList));
    console.log('state: ', getState());
  };
};

const setKaryawans = payload => {
  return {
    type: 'SET',
    payload,
  };
};

export default setKaryawan;
