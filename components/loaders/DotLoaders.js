import React from 'react';
import DotLoader from "react-spinners/DotLoader";
import styles from './dotloaders.module.scss';

const DotLoaders = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
};

export default DotLoaders;