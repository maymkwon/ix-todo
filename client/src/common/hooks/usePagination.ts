import { useCallback, useState, useEffect } from 'react';

import { TodoItem } from '../../store/todo/types';
import { PAGE_SIZE, MAX_PAGE } from '../Const';

interface IUsePagination {
  items: TodoItem[];
}
interface IPager {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

export default function usePagination({ items = [] }: IUsePagination) {
  const [pageNo, setPageNo] = useState(1);
  const [list, setList] = useState<any>([]);
  const [pager, setPager] = useState<IPager | null>(null);

  const handleChangePage = (curPage: number) => {
    const totalPageCount = items.length;

    const pagerInfo = getPage(totalPageCount, curPage);
    const pageList =
      pagerInfo && items.slice(pagerInfo.startIndex, pagerInfo.endIndex + 1);
    setPager(pagerInfo);
    setPageNo(curPage);
    setList(pageList);
    // if (pageList && pageList.length) {
    //   onChangePage(pageList);
    // }
  };

  useEffect(() => {
    if (items.length) {
      handleChangePage(pageNo);
    }
  }, [items]);

  const changePage = useCallback(handleChangePage, []);

  const getPage = (totalCount: number, currentPage: number) => {
    const pageSize = PAGE_SIZE;
    const maxPages = MAX_PAGE;
    let totalPages = Math.ceil(totalCount / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;

    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalCount - 1);

    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i
    );

    return {
      totalCount,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages,
    };
  };

  return {
    list,
    pager,
    pageNo,
    changePage,
  };
}
