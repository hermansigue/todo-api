function generatePaginationData(count, limit, offset) {
  const totalRecordCount = count;  // Jumlah total data
  const currentRecordCount = Math.min(limit, count - offset);  // Jumlah data pada halaman ini
  const totalPage = Math.ceil(count / limit);  // Total halaman
  const currentPage = Math.floor(offset / limit) + 1;  // Halaman saat ini
  const perPage = limit;  // Data per halaman
  const startOf = offset + 1;  // Indeks pertama data di halaman ini
  
  return {
    totalRecordCount,
    currentRecordCount,
    totalPage,
    currentPage,
    perPage,
    startOf
  };
}
  
module.exports = generatePaginationData;