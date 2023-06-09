import React, { useState } from 'react';
import { Rating } from "@mui/material";
import { useSession, signIn } from "next-auth/react";

import styles from './review.module.scss';
import AddReview from './AddReview';
import Table from './Table';

const Reviews = ({ product }) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState(product.reviews);
  // console.log(typeof(product.ratings[0]));
  // console.log(product.ratings);
  // console.log(product);
  // // console.log(reviews);
  // console.log(product.rating, "rating")
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h1>Customer Reviews ({product.reviews.length})</h1>

        <div className={styles.reviews__stats}>
          <div className={styles.reviews__stats_overview}>
            <span>Average Rating</span>

            <div className={styles.reviews__stats_overview_rating}>
              <Rating
                name="half-rating-read"
                defaultValue={product.rating}
                precision={1}
                readOnly
                style={{ color: "#FACF19" }}
              />
              {product.rating == 0 ? "No review yet." : product.rating}
            </div>
          </div>

          <div className={styles.reviews__stats_reviews}>
            {product.ratings.map((rating, i) => (
              <div
                key={i}
                className={styles.reviews__stats_reviews_review}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={5 - i}
                  readOnly
                  style={{ color: "#FACF19" }}
                />
                {rating.percentage !== "NaN" ? (
                  <>
                    <div className={styles.bar}>
                      <div
                        className={styles.bar__inner}
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                    <span>{rating.percentage}%</span>
                  </>
                ): (
                    <>
                      <div className={styles.bar}>
                        <div
                          className={styles.bar__inner}
                        ></div>
                      </div>
                      <span>0</span>
                    </>
                )}
              </div>
            ))}
          </div>
        </div>

        {session ? (
          <AddReview product={product} setReviews={setReviews} />
        ) : (
          <button onClick={() => signIn()} className={styles.login_btn}>
            Login to add review
          </button>
        )}

        <Table
          reviews={reviews}
          allSizes={product.allSizes}
          colors={product.colors}
        />
      </div>
    </div>

  )
}

export default Reviews;