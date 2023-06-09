import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import styles from './review.module.scss';
import TableHeader from './TableHeader';
import usePagination from '../../../hooks/usePagination';
import Review from './Review';

const Table = ({ reviews, allSizes, colors }) => {
  // console.log("Reviewsss", reviews);
  const [page, setPage] = useState(1);
  const PER_PAGE = 3
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);

  // console.log("_data", _DATA);

  const handleChange = (e, page) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <div className={styles.table}>
      <TableHeader
        reviews={reviews}
        allSizes={[{ size: "All" }, ...allSizes]}
        colors={[{ color: "", image: "" }, ...colors]}
      />

      <div className={styles.table__data}>
        {_DATA.currentData().map((review, i) => (
          <Review review={review} key={i} />
        ))}
      </div>

      <div className={styles.pagination}>
        <Pagination
          count={count}
          page={page}
          variant="round"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Table;