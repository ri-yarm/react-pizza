import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate'

import { setPage } from '../redux/slices/filterslice';

import style from './Pagination.module.less'

const Pagination = () => {
  const dispatch = useDispatch()
  return (
      <ReactPaginate
      className={style.paginate}
      activeClassName={style.active}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => dispatch(setPage(e.selected + 1))}
      pageRangeDisplayed={4}
      // pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageCount={3}
    />
  );
};

export default Pagination;
