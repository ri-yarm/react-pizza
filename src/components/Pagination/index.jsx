import ReactPaginate from 'react-paginate'

import style from './Pagination.module.less'

const Pagination = ({onChangingPage}) => {
  return (
      <ReactPaginate
      className={style.paginate}
      activeClassName={style.active}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangingPage(e.selected + 1)}
      pageRangeDisplayed={4}
      // pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageCount={3}
    />
  );
};

export default Pagination;
