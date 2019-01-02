import React, { PureComponent } from "react";
import { List, Icon, Tag } from "antd";
import { connect } from "dva";
import styles from "./Articles.less";

@connect(({ list }) => ({
  list
}))
class Center extends PureComponent {
  render() {
    const {
      list: { list }
    } = this.props;
    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => <List.Item key={item.id} />}
      />
    );
  }
}

export default Center;
