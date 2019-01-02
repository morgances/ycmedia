import React, { Component } from "react";
import { connect } from "dva";
import { Button } from "antd";

import styles from "./index.less";

class Post extends Component {
  constructor(props) {
    super(props);
  }

  pass = () => {
    const { dispatch } = this.props.item;
    console.log(`item: ${JSON.stringify(this.props.item)}`);
    dispatch({
      type: "post/passPost",
      payload: {
        target_id: this.props.item.id
      }
    });
  };

  noPass = () => {
    const { dispatch } = this.props.item;
    dispatch({
      type: "post/noPassPost",
      payload: {
        target_id: this.props.item.id
      }
    });
  };

  render() {
    const props = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.leftCard}>
          <div className={styles.eachItem}>
            <h3>昵称：</h3>
            <p>{props.item.nick_name}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>VIP：</h3>
            <p>{props.item.vip}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>年龄：</h3>
            <p>{props.item.age}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>星座：</h3>
            <p>{props.item.constellation}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>身高：</h3>
            <p>{props.item.height}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>点赞：</h3>
            <p>{props.item.commend}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>地址：</h3>
            <p>{props.item.location}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>内容：</h3>
            <p>{props.item.content}</p>
          </div>
          <div className={styles.eachItem}>
            <h3>时间：</h3>
            <p>{props.item.date}</p>
          </div>
        </div>

        <div className={styles.centerCard} />

        <div className={styles.rightCard}>
          <img
            className={styles.img}
            alt="images"
            src="http://seechina365.com/wp-content/uploads/dashataran22.jpg"
          />
        </div>

        <div>
          <Button onClick={this.pass} type="primary" size="large">
            确认通过
          </Button>
          <br />
          <br />
          <Button onClick={this.noPass} type="danger" size="large">
            不可通过
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ post }) => ({
  ...post
}))(Post);
