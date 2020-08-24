# Day-5 Karyawan

## Karyawan Table
| NIP | Nama | Assign Date | Departemen | Date of Birth | Delete |
|-----|------|-------------|------------|---------------|--------|
| 90275748473 | Fawwaazrahman | 02/02/2002 | IT Departement | 01/01/1001 | X |
| 90275748473 | Fawwaazrahman | 02/02/2002 | IT Departement | 01/01/1001 | X |
| 90275748473 | Fawwaazrahman | 02/02/2002 | IT Departement | 01/01/1001 | X |
| 90275748473 | Fawwaazrahman | 02/02/2002 | IT Departement | 01/01/1001 | X |

<br>

## Departement Table
| Departement | Capacity | Delete |
|-------------|----------|--------|
| IT Departement | 12 | X |
| IT Departement | 12 | X |
| IT Departement | 12 | X |
| IT Departement | 12 | X |

<br>

## Karyawan JSON Model
```
{
  nip: "90275748473",
  name: "Fawwaazrahman",
  assignDate: "02/02/2002",
  departement: "IT Departement",
  dob: "01/01/1001",
  password: "pw123"
}
```

<br>

## Departement JSON Model
```
{
  departement: "IT Departement",
  capacity: "12"
}
```

<br>

## loggedUser JSON
```
{
  nip: "90275748473",
  name: "Fawwaazrahman",
  password: "pw123"
}