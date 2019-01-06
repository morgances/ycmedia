import React, { PureComponent } from "react";
import moment from 'moment';
import { connect } from "dva";
import Link from "umi/link";
import router from "umi/router";
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input, List } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import styles from "./Center.less";

@connect(({ activities, loading }) => ({
  activities,
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class Center extends PureComponent {
    componentDidMount() {
      const { dispatch } = this.props;
      dispatch({
        type: 'project/fetchNotice',
      });
      dispatch({
        type: 'activities/fetchList',
      });
    }

  state = {
    currentUser: 
      {
      name: 'Oiar',
      avatar: 'http://pic1.win4000.com/wallpaper/3/55b1f8304d0c7.jpg',
      userid: '00000001',
    }
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      activitiesLoading,
    } = this.props;
    const {
      listLoading,
      currentUser,
      currentUserLoading
    } = this.state;
    return (
      <PageHeaderWrapper className={styles.userCenter}>
            <Card
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={currentUserLoading}
            >
              {currentUser && Object.keys(currentUser).length ? (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar} />
                    <div className={styles.name}>{currentUser.name}</div>
                    <div>{currentUser.signature}</div>
                  </div>
                </div>
              ) : (
                "loading..."
              )}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
      </PageHeaderWrapper>
    );
  }
}
