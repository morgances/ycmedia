import React from "react";
import moment from "moment";
import { Avatar } from "antd";
import styles from "./index.less";

const ArticleListContent = ({
  data: { content, updatedAt, avatar, owner }
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a>{owner}</a>
      <em>{moment(updatedAt).format("YYYY-MM-DD HH:mm")}</em>
    </div>
  </div>
);

export default ArticleListContent;
