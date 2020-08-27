const addChart = (canvasEl, arrLabels, arrData) => {
  new Chart(canvasEl, {
    type: 'pie',
    data: {
      labels: arrLabels,
      datasets: [
        {
          label: 'Income',
          backgroundColor: ['red', 'blue'],
          borderColor: 'white',
          data: arrData,
        },
      ],
    },
    options: {},
  });
};

export const generateChart = (canvasEl, nip) => {
  let incomeMobil = [];
  let incomeMotor = [];
  JSON.parse(localStorage.getItem('parkirs')).forEach(item => {
    if (item.byNip == nip) {
      if (item.tipe == 'mobil') {
        incomeMobil.push(item.biaya);
      } else {
        incomeMotor.push(item.biaya);
      }
    }
  });
  addChart(
    canvasEl,
    ['Mobil', 'Motor'],
    [
      incomeMobil.reduce((a, b) => parseInt(a) + parseInt(b)),
      incomeMotor.reduce((a, b) => parseInt(a) + parseInt(b)),
    ]
  );
};

export const totalIncomeChart = canvasEl => {
  let incomeOp1 = [];
  let incomeOp2 = [];
  JSON.parse(localStorage.getItem('parkirs')).forEach(item => {
    if (item.byNip == 'op1') {
      incomeOp1.push(item.biaya);
    } else {
      incomeOp2.push(item.biaya);
    }
  });
  addChart(
    canvasEl,
    ['Operator Satu', 'Operator Dua'],
    [
      incomeOp1.reduce((a, b) => parseInt(a) + parseInt(b)),
      incomeOp2.reduce((a, b) => parseInt(a) + parseInt(b)),
    ]
  );
};
