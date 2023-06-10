import React from 'react';
import styles from '../styles/search.module.scss';
import db from '../utils/db';
import Product from '../models/ProductModel';
import Category from '../models/CategoryModel';
import SubCategory from '../models/SubCategoryModel';
import { filterArray, randomize, removeDuplicates } from '../utils/arrayUtils';

import Link from 'next/link';
import { useRouter } from "next/router";

import ProductCard from '../components/productCard';
import CategoryFilter from '../components/searchPage/categoryFilter';
import SizesFilter from '../components/searchPage/sizesFilter';
import ColorsFilter from '../components/searchPage/colorsFilter';
import BrandsFilter from '../components/searchPage/brandsFilter';
import StylesFilter from '../components/searchPage/stylesFilter';
import PatternsFilter from '../components/searchPage/patternsFilter';
import GendersFilter from '../components/searchPage/genderFilter';
import MaterialsFilter from '../components/searchPage/materialsFilter';
import HeadingFilters from '../components/searchPage/headingFilter';
import Layout from '../components/layout/Layout';
import { createRegex } from '../utils/regex';

const SearchPage = ({
  categories,
  products,
  subCategories,
  sizes,
  colors,
  brands,
  stylesData,
  patterns,
  materials,
}) => {
  const router = useRouter();

  const filter = ({
    search,
    category,
    brand,
    style,
    size,
    color,
    pattern,
    material,
    gender,
    price,
    shipping,
    rating,
    sort,
    page,
  }) => {
    const path = router.pathname;
    const { query } = router;

    if (search) query.search = search;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (style) query.style = style;
    if (size) query.size = size;
    if (color) query.color = color;
    if (pattern) query.pattern = pattern;
    if (material) query.material = material;
    if (gender) query.gender = gender;
    if (price) query.price = price;
    if (shipping) query.shipping = shipping;
    if (rating) query.rating = rating;
    if (sort) query.sort = sort;
    if (page) query.page = page;
    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (category) => {
    filter({ category });
  };

  const sizeHandler = (size) => {
    filter({ size });
  };

  const colorHandler = (color) => {
    filter({ color });
  };

  const brandHandler = (brand) => {
    filter({ brand });
  };

  const styleHandler = (style) => {
    filter({ style });
  };

  const patternHandler = (pattern) => {
    filter({ pattern });
  };

  const materialHandler = (material) => {
    filter({ material });
  };

  const genderHandler = (gender) => {
    if (gender == "Unisex") {
      filter({ gender: {} });
    } else {
      filter({ gender });
    }
  };
  const priceHandler = (price, type) => {

  };

  const checkChecked = (sort) => {

  };

  const replaceQuery = (queryName, value) => {

  };

  const shippingHandler = (shipping) => {

  };

  const multiPriceHandler = (min, max) => {

  };

  const ratingHandler = (rating) => {

  };

  const sortHandler = (sort) => {

  };

  const pageHandler = (e, page) => {

  };

  const searchHandler = (search) => {
    if (search == "") {
      filter({ search: {} });
    } else {
      filter({ search });
    }
  }

  return (
    <div className={styles.browse}>
      <Layout searchHandler={searchHandler}>
        <div className={styles.browse__container}>
          <div>
            <div className={styles.browse__path}>Home / Browse</div>
            <div className={styles.browse__tags}>
              {categories.map((c) => (
                <Link href="" key={c._id}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div
            className={`${styles.browse__store}`}
          >
            {/* Lef Side Filter Component */}
            <div
              className={`${styles.browse__store_filters} ${styles.scrollbar}`}
            >
              <button
                className={styles.browse__clearBtn}
                onClick={() => router.push("/browse")}
              >
                Clear All ({Object.keys(router.query).length})
              </button>

              <CategoryFilter
                categories={categories}
                subCategories={subCategories}
                categoryHandler={categoryHandler}
                replaceQuery={replaceQuery}
              />

              <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />

              <ColorsFilter
                colors={colors}
                colorHandler={colorHandler}
                replaceQuery={replaceQuery}
              />

              <BrandsFilter
                brands={brands}
                brandHandler={brandHandler}
                replaceQuery={replaceQuery}
              />

              <StylesFilter
                data={stylesData}
                styleHandler={styleHandler}
                replaceQuery={replaceQuery}
              />

              <PatternsFilter
                patterns={patterns}
                patternHandler={patternHandler}
                replaceQuery={replaceQuery}
              />

              <MaterialsFilter
                materials={materials}
                materialHandler={materialHandler}
                replaceQuery={replaceQuery}
              />

              <GendersFilter
                genderHandler={genderHandler}
                replaceQuery={replaceQuery}
              />


            </div>

            {/* Heading Filter & product */}
            <div className={styles.browse__store_products_wrap}>
              {/* Heading Filters */}
              <HeadingFilters
                priceHandler={priceHandler}
                multiPriceHandler={multiPriceHandler}
                shippingHandler={shippingHandler}
                ratingHandler={ratingHandler}
                replaceQuery={replaceQuery}
                sortHandler={sortHandler}
              />

              <div className={styles.browse__store_products}>
                {products?.map((product) => (
                  <ProductCard product={product} key={product._id} />
                ))}
              </div>

              <div className={styles.pagination}>
                {/* Pagination */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default SearchPage;

export async function getServerSideProps(context) {
  // get query
  const { query } = context;
  const searchQuery = query.search || "";
  const categoryQuery = query.category || "";
  const genderQuery = query.gender || "";
  const priceQuery = query.price?.split("_") || "";
  const shippingQuery = query.shipping || 0;
  const ratingQuery = query.rating || "";
  const sortQuery = query.sort || "";
  const pageSize = 50;
  const page = query.page || 1;

  // Brand Filter query, array, regex => filter multiply
  const brandQuery = query.brand?.split("_") || "";
  const brandRegex = `^${brandQuery[0]}`;
  const brandSearchRegex = createRegex(brandQuery, brandRegex);

  // Style Filter query, array, regex => filter multiply
  const styleQuery = query.style?.split("_") || "";
  const styleRegex = `^${styleQuery[0]}`;
  const styleSearchRegex = createRegex(styleQuery, styleRegex);

  // search query
  const search =
    searchQuery && searchQuery !== ""
      ? {
        name: {
          $regex: searchQuery,
          $options: "i",
        },
      }
      : {};

  const category =
    categoryQuery && categoryQuery !== ""
      ? { category: categoryQuery }
      : {};

  const brand =
    brandQuery && brandQuery !== ""
      ? {
        brand: {
          $regex: styleRegex,
          $options: "i",
        },
      }
      : {};

  const style =
    styleQuery && styleQuery !== ""
      ? {
        "details.value": {
          $regex: styleSearchRegex,
          $options: "i",
        },
      }
      : {};

  // ====> Get data From Db <==== //
  db.connectDb();
  let productsDb = await Product.find({
    ...search,
    ...category,
    ...brand,
    ...style
  })
    .sort()
    .lean();

  let categories = await Category.find().lean();

  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();

  let products = sortQuery && sortQuery !== ""
    ? productsDb
    : randomize(productsDb);

  let colors = await Product.find({ ...category })
    .distinct("subProducts.color.color");

  let brandsDb = await Product.find({ ...category })
    .distinct("brand");

  let sizes = await Product.find({ ...category })
    .distinct("subProducts.sizes.size");

  let details = await Product.find({ ...category }).distinct("details");

  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);


  db.disconnectDb();
  // ====>

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      sizes,
      colors,
      brands,
      stylesData: styles,
      patterns,
      materials,
    }
  };
};