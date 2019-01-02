import React, { PureComponent } from "react";
import { connect } from "dva";
import Link from "umi/link";
import router from "umi/router";
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import styles from "./Center.less";

@connect(({ loading, user, project }) => ({
  listLoading: loading.effects["list/fetch"],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects["user/fetchCurrent"],
  project,
  projectLoading: loading.effects["project/fetchNotice"]
}))
class Center extends PureComponent {
  state = {
    newTags: [],
    inputVisible: false,
    inputValue: "",
  };
  
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "user/fetchCurrent"
    });
    dispatch({
      type: "list/fetch",
      payload: {
        count: 8
      }
    });
    dispatch({
      type: "project/fetchNotice"
    });
  }

  onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case "articles":
        router.push(`${match.url}/articles`);
        break;
      case "applications":
        router.push(`${match.url}/applications`);
        break;
      case "projects":
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => {
    this.input = input;
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { newTags } = state;
    if (
      inputValue &&
      newTags.filter(tag => tag.label === inputValue).length === 0
    ) {
      newTags = [
        ...newTags,
        { key: `new-${newTags.length}`, label: inputValue }
      ];
    }
    this.setState({
      newTags,
      inputVisible: false,
      inputValue: ""
    });
  };

  render() {
    const { newTags, inputVisible, inputValue } = this.state;
    const {
      listLoading,
      currentUser,
      currentUserLoading,
      project: { notice },
      projectLoading,
      match,
      location,
      children
    } = this.props;

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
      </PageHeaderWrapper>
    );
  }
}

export default Center;
