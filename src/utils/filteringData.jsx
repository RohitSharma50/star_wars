export function filteringData(searchText, list) {
  if (searchText === "films") {
    const filterData = list.filter(
      (data) => data.films && data.films.length < 5
    );
    return filterData;
  } else if (searchText === "species") {
    const filterData = list.filter(
      (data) => data.species && data.species.length > 0
    );
    return filterData;
  } else {
    const filterData = list.filter((data) =>
      data?.name.toUpperCase().includes(searchText.toUpperCase())
    );
    return filterData;
  }
}
