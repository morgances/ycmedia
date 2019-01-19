import React, { PureComponent } from "react";
import { connect } from "dva";
import moment from 'moment';
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
  Form,
  Avatar
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

@connect(({ list }) => ({
  list,
}))
@Form.create()
class BasicList extends PureComponent {
  constructor(props) {
    super(props);
  }

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "list/fetch",
      payload: {
        category: 0,
        page: 0,
        tag: 0,
      }
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: "list/removeList",
      payload: { id }
    });
  };

  render() {
    const {
      list: { list },
      loading,
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 10,
      total: 10,
    }

    const ListContent = ({
       data: { author, date } 
      }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{author}</p>
        </div>
        <div className={styles.listContentItem}>
          <p>{moment(date).format('YYYY-MM-DD HH:mm')}</p>
        </div>
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
                    <RadioGroup buttonStyle="solid">
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
              loading={loading}
              rowKey="aid"
              //itemLayout="vertical"
              pagination={paginationProps}
              //loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.aid}
                  //extra={<div className={styles.listItemExtra} />}
                  actions={[<MoreBtn current={item} />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} shape="square" size="large" />}
                    title={
                      <div>{item.title}</div>
                    }
                    description={
                      <span>
                        <Tag><div>{item.tag}</div></Tag>
                      </span>
                    }
                  />
                  <ListContent data={item} />
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
