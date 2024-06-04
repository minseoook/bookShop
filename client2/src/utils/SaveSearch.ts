export const saveSearch = (term: string) => {
  const searchTerms = JSON.parse(localStorage.getItem("searchTerms")!) || [];
  if (!searchTerms.includes(term)) {
    searchTerms.unshift(term);
    if (searchTerms.length > 5) {
      searchTerms.pop(); // 최근 검색어 5개만 저장
    }
    localStorage.setItem("searchTerms", JSON.stringify(searchTerms));
  }
};

export const getSearchTerms = () => {
  return JSON.parse(localStorage.getItem("searchTerms")!) || [];
};
