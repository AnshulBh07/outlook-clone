// creating a custom hook for pagination purposes which will return a pagination pill range

import { useMemo } from "react";

// it'll take some values as input
export const usePagination = ({
  totalCount, //total number of items that are to be compiled
  pageSize, //max number of items allowed on a single page
  currentPage, //the value of curr page
}) => {
  // this will return an array which represents ui for our pagination component
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalCount / pageSize); //count maximum pages possible

    // method that returns an array from range [start,end]
    const range = (start, end) => {
      let ans = [];
      for (var i = start; i <= end; i++) {
        ans.push(i);
      }
      return ans;
    };

    //now at max we want to display 4 clickable buttons on a single page pill so
    if (totalPages <= 4) return range(1, totalPages);
    //else if the total pages is more than 5 we will have three possible states of our page pill UI
    //1. Dots are at the end just before final page, this means that we are somewhere between the first 4 pages
    //2. Dots are at the initial just after first page, this means we are somewhere between the last 5 pages
    //3. Dots are at both the ends which means that we aren't at either positions, this starts at page 5,
    //so now let's implement this logic
    else {
      if (currentPage >= 1 && currentPage < 4) {
        return [...range(1, 4), "...", totalPages];
      } else if (currentPage > totalPages - 4 && currentPage <= totalPages) {
        return [1, "...", ...range(totalPages - 3, totalPages)];
      } else {
        return [
          1,
          "...",
          ...range(currentPage - 1, currentPage + 1),
          "...",
          totalPages,
        ];
      }
    }
  }, [currentPage, pageSize, totalCount]);

  return paginationRange;
};
