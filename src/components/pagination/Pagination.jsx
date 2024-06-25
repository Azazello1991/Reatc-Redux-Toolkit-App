import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
// redux
import { useSelector, useDispatch } from 'react-redux'
import { setPagination } from '../../redux/slices/filtersSlice';

const Pagination = () => {
  const dispatch = useDispatch()


  return (
    <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel="next >"
        // onPageChange={(event)=>setCurrentPage(event.selected)} // через useState
        onPageChange={(event)=>dispatch(setPagination(event))} // через redux
        pageRangeDisplayed={8}
        pageCount={3}
        previousLabel="< prev"
        renderOnZeroPageCount={null}
      />
  )
}

export default Pagination;
