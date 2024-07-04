import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { PaginationStyle } from './PaginationStyle';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

interface Props {
  pagination: {
    currentPage : number;
    limit : number;
    totalElements : number;
    totalPages : number;
  }
}

const TemppaginationData = {
  currentPage: 1,
  limit: 10,
  totalElements: 100,
  totalPages: 10,
};

const Pagination = ({ pagination } : Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = pagination.currentPage || 1;
  const currentPageGroup = Math.ceil(currentPage / 5);

  const handleClickPage = (page : number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    setSearchParams(newSearchParams);
  };

  const pageButtonRender = (totalPages : number) => {
    const startPage = (currentPageGroup - 1) * 5 + 1;
    const endPage = Math.min(5 * currentPageGroup, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <div className={`pageButton ${i === currentPage ? 'active' : ''}`}
            onClick={() => handleClickPage(i)}>{i}</div>
        </li>
      );
    }
    return pageNumbers;
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handleClickPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < TemppaginationData.totalPages) {
      handleClickPage(currentPage + 1)
    }
  }

  return (
    <PaginationStyle>
        <button className='controllButton' onClick={prevPage}>
        <PiCaretLeft />
        </button>
        {pageButtonRender(TemppaginationData.totalPages)}
        <button className='controllButton' onClick={nextPage}>
        <PiCaretRight />
        </button>
    </PaginationStyle>
  )
}

export default Pagination
