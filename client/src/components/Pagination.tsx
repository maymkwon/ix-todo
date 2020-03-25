import React, { useState, useEffect, memo } from 'react';
import { PaginationItem } from '@material-ui/lab';
import { PAGE_SIZE, MAX_PAGE } from '../common/Const';
import { TodoItem } from '../store/todo/types';

type IPagination = {
  items: TodoItem[];
  onChangePage: (items: TodoItem[]) => void;
};

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
const Pagination = ({ items = [], onChangePage }: IPagination) => {
  const [pageNo, setPageNo] = useState(1);
  const [pager, setPager] = useState<IPager | null>(null);

  const handleChangePage = (curPage: number) => {
    const totalPageCount = items.length;

    const pagerInfo = getPage(totalPageCount, curPage);
    const pageList =
      pagerInfo && items.slice(pagerInfo.startIndex, pagerInfo.endIndex + 1);
    setPager(pagerInfo);
    setPageNo(curPage);
    if (pageList && pageList.length) {
      onChangePage(pageList);
    }
  };

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

  useEffect(() => {
    if (items.length) {
      handleChangePage(pageNo);
    }
  }, [items, pageNo]);

  if (!pager || pager.pages.length <= 1) {
    return null;
  }
  return (
    // PaginationItem 컴포넌트는 스타일을 위해 사용
    <div style={{ display: 'flex' }}>
      <PaginationItem
        type="first"
        onClick={() => handleChangePage(1)}
        disabled={pager.currentPage === 1}
      />
      {pager.startPage > 1 && <PaginationItem type="start-ellipsis" />}
      {pager.pages.map((page: number) => {
        return (
          <PaginationItem
            key={page}
            page={page}
            selected={pager.currentPage === page}
            onClick={() => handleChangePage(page)}
          />
        );
      })}
      {pager.totalPages > pager.endPage && (
        <PaginationItem type="end-ellipsis" />
      )}
      <PaginationItem
        type="last"
        onClick={() => handleChangePage(pager.totalPages)}
        disabled={pager.currentPage === pager.totalPages}
      />
    </div>
  );
};

export default memo(Pagination);
