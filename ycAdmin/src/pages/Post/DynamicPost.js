import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { Upload, Button, message, Icon, Card, Modal, Table, Popconfirm, Divider, Input, Form } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

const FormItem = Form.Item;
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="新添轮播图"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
class DynamicPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  deleteConfirm = (aid) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/removeList',
      payload: {
        aid
      },
    })
  }

  showEditModal = aid => {
    this.setState({
      visible: true,
      current: aid,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/gettext',
      payload: {
        aid: 123
      },
    })
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const { modalVisible } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '轮播图',
        dataIndex: 'image',
        key: 'image'
      },
      {
        title: '轮播开始时间',
        dataIndex: 'start',
        key: 'start',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
      },
      {
        title: '轮播结束时间',
        dataIndex: 'end',
        key: 'end',
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
                this.showEditModal(aid);
              }}
              //href="adding-list"
            >
              编辑
            </a>
          </Fragment>
        )
      }
    ]

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderWrapper title="轮播图">
        <Card>
          <Button style={{ marginBottom: 20 }} icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
            添加
          </Button>
          <Table
            columns={columns}
          />
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default DynamicPost;
