import React, { PureComponent } from "react";
import { connect } from "dva";
import {
  Tag,
  List,
  Card,
  Radio,
  Input,
  Button,
  Dropdown,
  Icon,
  Menu,
  Modal,
  Form
} from "antd";

import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import ArticleListContent from "@/components/ArticleListContent";
import styles from "./BasicList.less";
import StandardFormRow from "@/components/StandardFormRow";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const pageSize = 5;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
@Form.create()
class BasicList extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "list/fetch",
      payload: {
        count: 5
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : "";

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true
      });
      dispatch({
        type: "list/submit",
        payload: { id, ...fieldsValue }
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: "list/submit",
      payload: { id }
    });
  };

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const {
      list: { list },
      loading
    } = this.props;

    const {
      form: { getFieldDecorator }
    } = this.props;

    const editAndDelete = (key, currentItem) => {
      if (key === "edit") this.showEditModal(currentItem);
      else if (key === "delete") {
        Modal.confirm({
          title: "删除文章",
          content: "确定删除该文章吗？",
          okText: "确认",
          cancelText: "取消",
          onOk: () => this.deleteItem(currentItem.id)
        });
      }
    };

    const extraContent = (
      <div className={styles.extraContent}>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入标题/作者"
          enterButton="查找"
          size="large"
          onSearch={this.handleChange}
          autosize="true"
        />
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item><a href="adding-list">编辑</a></Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const loadMore =
      list.length > 0 ? (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button
            onClick={this.fetchMore}
            style={{ paddingLeft: 48, paddingRight: 48 }}
          >
            {loading ? (
              <span>
                <Icon type="loading" /> 加载中...
              </span>
            ) : (
              "加载更多"
            )}
          </Button>
        </div>
      ) : null;

    return (
      <PageHeaderWrapper title="文章列表">
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: "0 32px 40px 32px" }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: "100%", marginBottom: 8 }}
              icon="plus"
              href="adding-list"
            >
              添加文章
            </Button>
            <Form>
              <StandardFormRow
                title="所属类别"
                style={{ paddingBottom: 11, marginTop: 20 }}
              >
                <FormItem>
                  {getFieldDecorator("category")(
                    <RadioGroup defaultValue="all" buttonStyle="solid">
                      <RadioButton value="all">全部</RadioButton>
                      <RadioButton value="1">文化资讯</RadioButton>
                      <RadioButton value="2">书香银川</RadioButton>
                      <RadioButton value="3">遗脉相承</RadioButton>
                      <RadioButton value="4">银川旅游</RadioButton>
                      <RadioButton value="5">艺术空间</RadioButton>
                      <RadioButton value="6">凤城演绎</RadioButton>
                      <RadioButton value="7">文化消费</RadioButton>
                      <RadioButton value="8">文化品牌</RadioButton>
                    </RadioGroup>
                  )}
                </FormItem>
              </StandardFormRow>
            </Form>
          </Card>
          <Card
            style={{ marginTop: 24 }}
            bordered={false}
            bodyStyle={{ padding: "8px 32px 32px 32px" }}
          >
            <List
              size="large"
              loading={list.length === 0 ? loading : false}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  extra={<div className={styles.listItemExtra} />}
                  actions={[<MoreBtn current={item} />]}
                >
                  <List.Item.Meta
                    title={
                      <a className={styles.listItemMetaTitle}>{item.title}</a>
                    }
                    description={
                      <span>
                        <Tag>文化资讯</Tag>
                      </span>
                    }
                  />
                  <ArticleListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
