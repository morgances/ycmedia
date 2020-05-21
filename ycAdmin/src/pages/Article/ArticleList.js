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
  Pagination,
  message
} from "antd";

import Highlighter from 'react-highlight-words';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import ArticleListContent from "@/components/ArticleListContent";
import styles from "./ArticleList.less";
import StandardFormRow from "@/components/StandardFormRow";
import StandardTable from "@/components/StandardTable";
import Link from 'umi/link';
import { routerRedux } from 'dva/router';
import EditingArticle from "./EditingArticle";

const Search = Input.Search;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class ArticleList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      searchText: '',
      formValues: {},
      category: '文化资讯',
    };
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <Card bordered={false}>
        <div style={{ padding: 0 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder='请输入'
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8, height: 30 }}
          >
            查找
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90, height: 30 }}
          >
            重置
          </Button>
        </div>
      </Card>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  componentDidMount() {
    const { category } = this.state;
    const { dispatch, rule } = this.props;
    dispatch({
      type: "rule/queryArticleList",
      payload: {
        category
      }
    });
  };

  handleChange = (e) => {
    this.setState({
      category: e.target.value
    })
    const { dispatch } = this.props;
    const { category } = this.state;
    dispatch({
      type: "rule/queryArticleList",
      payload: {
        category: e.target.value
      }
    })
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  deleteConfirm = aid => {
    const { dispatch } = this.props;
    const { category } = this.state;
    dispatch({
      type: 'rule/removeArticle',
      payload: {
        aid,
        category
      },
    });
    message.success('删除成功');
  }

  adding = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/article/adding-article/',
    }))
  }

  render() {
    const { tag, label, rule: { data }, loading } = this.props;
    const { selectedRows } = this.state;
    const category = this.state.category;
    const columns = [
      {
        title: '文章作者',
        dataIndex: 'author',
        key: 'author',
        ...this.getColumnSearchProps('author'),
      },
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '文章类别',
        children: [{
          title: '文章标签',
          dataIndex: 'tag',
          key: 'tag',
          ...this.getColumnSearchProps('tag'),
          render: tag => 
            <span>
              {tag === "" ? "" : <Tag color="blue" key={tag}>{tag}</Tag>}
            </span>
        },{
          title: '文章标记',
          dataIndex: 'label',
          key: 'label',
          ...this.getColumnSearchProps('label'),
          render: label =>
            <span>
              {label === "" ? "" : <Tag color="blue" key={label}>{label}</Tag>}
            </span>
        }]
      },
      {
        title: '更新时间',
        dataIndex: 'date',
        key: 'date',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Popconfirm
              title="确定删除？"
              onConfirm={() => this.deleteConfirm(record.aid)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Link
              to={`/article/editing-article/${record.aid}`}
            >
              编辑
            </Link>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="文章列表">
        <Card bordered={false}>
          <Button
            type="dashed"
            style={{ width: "100%", marginBottom: 20 }}
            icon="plus"
            onClick={this.adding}
          >
            添加文章
          </Button>
          <Radio.Group value={category} style={{ marginBottom: 20 }} onChange={this.handleChange}>
            <h4 style={{ marginRight: 8, display: 'inline' }}>文章分类：</h4>
            <Radio.Button value={'文化资讯'}>文化资讯</Radio.Button>
            <Radio.Button value={'书香银川'}>书香银川</Radio.Button>
            <Radio.Button value={'遗脉相承'}>遗脉相承</Radio.Button>
            <Radio.Button value={'银川旅游'}>银川旅游</Radio.Button>
            <Radio.Button value={'艺术空间'}>艺术空间</Radio.Button>
            <Radio.Button value={'文化消费'}>文化消费</Radio.Button>
            <Radio.Button value={'文化品牌'}>文化品牌</Radio.Button>
            <Radio.Button value={'凤城演绎'}>凤城演绎</Radio.Button>
          </Radio.Group>
          <div className={styles.tableList}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ArticleList;
