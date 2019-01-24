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
  Popconfirm,
  Cascader,
} from "antd";

import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import ArticleListContent from "@/components/ArticleListContent";
import styles from "./BasicList.less";
import StandardFormRow from "@/components/StandardFormRow";
import StandardTable from "@/components/StandardTable";

const Search = Input.Search;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
//const { Search } = Input;
const pageSize = 5;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const tag = ['文化资讯', '书香银川', '遗脉相承', '银川旅游', '艺术空间', '凤城演绎', '文化消费', '文化品牌'];
const options = [{
  value: '文化资讯',
  label: '文化资讯',
  children: [{
    value: '文化动态',
    label: '文化动态',
  },{
    value: '通知公告',
    label: '通知公告',
  },{
    value: '政策法规',
    label: '政策法规',
  },{
    value: '免费开放',
    label: '免费开放',
  }],
},{
  value: '书香银川',
  label: '书香银川',
  children: [{
    value: '图书借阅',
    label: '图书借阅',
  },{
    value: '服务指南',
    label: '服务指南',
  },{
    value: '数字资源',
    label: '数字资源',
  },{
    value: '好书推荐',
    label: '好书推荐',
  }]
},{
  value: '遗脉相承',
  label: '遗脉相承',
  children: [{
    value: '文化遗产',
    label: '文化遗产',
  },{
    value: '非遗传承',
    label: '非遗传承',
  }]
},{
  value: '银川旅游',
  label: '银川旅游',
},{
  value: '艺术空间',
  label: '艺术空间',
  children: [{
    value: '艺术资讯',
    label: '艺术资讯',
  },{
    value: '名家介绍',
    label: '名家介绍',
  },{
    value: '艺术展示',
    label: '艺术展示',
  },{
    value: '艺术场馆',
    label: '艺术场馆',
  }]
},{
  value: '凤城演绎',
  label: '凤城演绎',
  children: [{
    value: '群众文化',
    label: '群众文化',
  },{
    value: '银川记忆',
    label: '银川记忆',
  }]
},{
  value: '文化消费',
  label: '文化消费',
  children: [{
    value: '银川影院',
    label: '银川影院',
  },{
    value: '艺术剧院',
    label: '艺术剧院',
  }]
},{
  value: '文化品牌',
  label: '文化品牌',
}];
function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
};
function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
};

@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class BasicList extends PureComponent {
  // this.state = {
  //   modalVisible: false,
  //   updateModalVisible: false,
  //   selectedRows: [],
  //   formValues: {},
  //   stepFormValues: {},
  // };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
      value: '',
    };
  };

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

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleauthorChange = (input) => {
    this.setState({
      value: input
    })
    const data = {
      "author": input
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
      payload: {
        ...data,
      },
    })
  }

  handletitleChange = (input) => {
    this.setState({
      value: input
    })
    const data = {
      "title": input
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
      payload: {
        ...data,
      },
    })
  }

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    console.log(dispatch,"4")

    form.validateFields((err,fieldsValue) => {
      if (err) return;
      this.setState({
        formValues: fieldsValue,
      });
      const values = {
        ...fieldsValue,
        updateAt: fieldsValue.updateAt && fieldsValue.updateAt.valueOf(),
      };

      dispatch({
        type: 'rule/fetch',
        payload: {
          category: 0,
          page: 0,
          tag: 0,
        },
      });
    });
  };

  deleteConfirm = (itemId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/removeList',
      payload: {
        target_id: itemId,
      },
    })
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <div>
      <Search
      ref="search"
      placeholder="输入想要查询的用户ID"
      enterButton
      size="large"
      onSearch={this.handletitleChange}
    />
      {/* <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8,lg: 24,xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="文章作者">
              {getFieldDecorator('author')(<Input placeholder="请输入" onSearch={this.handleauthorChange} />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="文章标题">
              {getFieldDecorator('title')(<Input placeholder="请输入" onSearch={this.handletitleChange} />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="文章分类">
              {getFieldDecorator('tag')(
                <Cascader options={options} onChange={onChange} placeholder="请选择" showSearch={{ filter }} />
              )}
            </FormItem>
          </Col>
          <Col md={3} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查找</Button>
            </span>
          </Col>
        </Row>
      </Form> */}
      </div>
    )
  }

  render() {
    const columns = [
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
        dataIndex: 'tag',
      },
      {
        title: '更新时间',
        dataIndex: 'date',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Popconfirm
            title="确定删除？"
            onConfirm={() => this.deleteConfirm(record.id)}
            okText="确认"
            cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a href="adding-list">编辑</a>
          </Fragment>
        ),
      },
    ];
    const {
      rule: { data },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { selectedRows,modalVisible,updateModalVisible, stepFormValues } = this.state;

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
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
