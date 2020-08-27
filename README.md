# Day 6 Parkir

<br>

- [x] Login Operator
  - [x] Masuk Parkir
    - [x] Add Waktu Masuk (Epoch)
    - [x] Add byNip
    - [x] Add Tipe
    - [x] Add Plat No.
    - [x] Display Waktu Masuk
  - [x] Keluar Parkir
    - [x] Add Waktu Keluar (Epoch)
    - [x] Add Biaya
    - [x] Display Waktu Masuk
    - [x] Display Waktu Keluar
    - [x] Display Biaya
- [x] Login Admin
  - [x] laporan per op
  - [x] chartjs

<br>

## parkirs JSON Model

```
{
    token: "28493",
    tipe: "mobil",
    plat: "B 2849 ZC",
    waktuMasuk: "1598422361725",
    waktuKeluar: "1598422311725",
    biaya: 8000,
    byNip: "op1",
  }
```

<br>

## karyawans JSON Model

```
{
  nip: "op1",
  name: "Operator Satu",
  password: "123",
  role: "operator",
}
```

<br>

## loggedUser JSON Model

```
{
  nip: "op1",
  name: "Operator Satu",
  password: "123",
  role: "operator",
}
```
