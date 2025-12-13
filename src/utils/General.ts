export const formatDate = (paramDate: any) => {
  // se establece la fecha con base en la fecha recibia por parametro //
  const date = new Date(paramDate);

  // se extraen el año, mes y dia de la fecha //
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // se arma estructura la cual se quiera mostrar //
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
