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
  Pagination,
} from "antd";

import Highlighter from 'react-highlight-words';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import ArticleListContent from "@/components/ArticleListContent";
import styles from "./BasicList.less";
import StandardFormRow from "@/components/StandardFormRow";
import StandardTable from "@/components/StandardTable";

const Search = Input.Search;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// const data = [{
//   key: '0',
//   name: '文化资讯',
// },{
//   key: '1',
//   name: '书香银川',
// },{
//   key: '2',
//   name: '遗脉相承',
// },{
//   key: '3',
//   name: '银川旅游',
// },{
//   key: '4',
//   name: '艺术空间',
// },{
//   key: '5',
//   name: '凤城演绎',
// },{
//   key: '6',
//   name: '文化消费',
// },{
//   key: '7',
//   name: '文化品牌',
// }];

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
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      selectedRows: [],
      stepFormValues: {},
      searchText: '',
      formValues: {},
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

  handleStandardTableChange = (Pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: Pagination.current,
      pageSize: Pagination.pageSize,
      ...formValues
    }

    dispatch({
      type: 'rule/fetch',
      payload: {
        params,
      }
    })
  }

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/gettext',
      payload: {
        
      },
    })
  };

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

  deleteConfirm = (aid) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/removeList',
      payload: {
        aid
      },
    })
  }

  editText = (aid) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/addlist',
      payload: {
        aid,
      }
    })
  }

  render() {
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
        title: '文章分类',
        dataIndex: 'category',
        key: 'category',
        ...this.getColumnSearchProps('category'),
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
            <a 
              onClick={e => {
                e.preventDefault();
                this.showEditModal(item);
              }}
              //href="adding-list"
            >
              编辑
            </a>
          </Fragment>
        ),
      },
    ];
    const {
      rule: { data },
      loading,
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
            <div className={styles.tableListForm}></div>
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
