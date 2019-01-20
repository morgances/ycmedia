import React, { PureComponent, Fragment } from "react";
import { connect } from "dva";
import moment from 'moment';
import {
  Row,
  Col,
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
  Avatar,
  Badge,
  Divider,
  Select,
  Popconfirm
} from "antd";

import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import ArticleListContent from "@/components/ArticleListContent";
import styles from "./BasicList.less";
import StandardFormRow from "@/components/StandardFormRow";
import StandardTable from "@/components/StandardTable";

const FormItem = Form.Item;
const { Option } = Select;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const pageSize = 5;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const tag = ['文化资讯', '书香银川', '遗脉相承', '银川旅游', '艺术空间', '凤城演绎', '文化消费', '文化品牌'];

@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class BasicList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  // constructor(props) {
  //   super(props);
  // };

  columns = [
    {
      title: '文章作者',
      dataIndex: 'author',
    },
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      title: '文章分类',
      dataIndex: 'category',
    },
    {
      title: '上次更新时间',
      dataIndex: 'date',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
    },
  ];

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "rule/fetch",
      payload: {
        category: 0,
        page: 0,
        tag: 0,
      }
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const  { dispatch } = this.props;
    const {formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    dispatch({
      type: 'rule/fetch',
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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err,fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updateAt: fieldsValue.updateAt && fieldsValue.updateAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8,lg: 24,xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="文章作者">
              {getFieldDecorator('author')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="文章标题">
              {getFieldDecorator('title')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="文章分类">
              {getFieldDecorator('category')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">文化资讯</Option>
                  <Option value="1">书香银川</Option>
                  <Option value="2">遗脉相承</Option>
                  <Option value="3">银川旅游</Option>
                  <Option value="4">艺术空间</Option>
                  <Option value="5">凤城演绎</Option>
                  <Option value="6">文化消费</Option>
                  <Option value="7">文化品牌</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查找</Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  render() {
    const {
      rule: { data },
      loading,
    } = this.props;
    const {
      list: { list },
      //loading,
    } = this.props;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { selectedRows,modalVisible,updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );

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
        <Card bordered={false}>
          <Button
            type="dashed"
            style={{ width: "100%", marginBottom: 20 }}
            icon="plus"
            href="adding-list"
          >
            添加文章
          </Button>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
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
