import React, { PureComponent } from "react";
import { List, Card, Avatar } from "antd";
import { connect } from "dva";
import stylesApplications from "../../List/Applications.less";

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
        rowKey="id"
        className={stylesApplications.filterCardList}
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card hoverable bodyStyle={{ paddingBottom: 20 }}>
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div className={stylesApplications.cardItemContent} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Center;
