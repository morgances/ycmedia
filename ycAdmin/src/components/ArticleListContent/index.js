import React from "react";
import moment from "moment";
import { Avatar } from "antd";
import styles from "./index.less";

const ArticleListContent = ({
  data: { text, date, author }
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{text}</div>
    <div className={styles.extra}>
      <a>{author}</a>
      <em>{moment(date).format("YYYY-MM-DD HH:mm")}</em>
    </div>
  </div>
);

export default ArticleListContent;
