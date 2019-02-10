import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { findDOMNode } from "react-dom";
import { Upload, Button, message, Icon, Card, Modal, Table, Popconfirm, Divider, Input, Form, DatePicker } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Result from "@/components/Result";
import styles from "./DynamicPost.less";
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';

@Form.create()
class DynamicPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    fileList: [],
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

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false
    });
  };

  handleModalCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({
          done: true,
        });
        dispatch({
          type: "list/addPictureList",
          payload: {
            ...fieldsValue
          }
        });
      }
    });
  };

  formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
    });
  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { modalVisible, fileList, visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
        okText: "添加",
        onOk: this.handleSubmit,
        onCancel: this.handleModalCancel
      };
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="添加成功"
            action={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="上传图片" {...this.formLayout}>
          {getFieldDecorator("image", {
            //valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <div className="clearfix">
              <Upload accept="image/*" name="logo" action="http://39.98.162.91:9573/api/v1/upload" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            </div>
          )}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator("start", {
              initialValue: moment(),
              rules: [{ required: true, message: "请选择轮播开始时间" }],
            })(<DatePicker format={dateFormat} />)}
          </FormItem>
          <FormItem label="结束时间" {...this.formLayout}>
            {getFieldDecorator("end", {
              initialValue: moment(),
              rules: [{ required: true, message: "请选择轮播结束时间" }],
            })(<DatePicker format={dateFormat} />)}
          </FormItem>
        </Form>
      )
    }

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

    return (
      <PageHeaderWrapper title="轮播图">
        <Card>
          <Button 
            style={{ marginBottom: 20 }} 
            htmlType="submit" 
            icon="plus" 
            type="primary" 
            onClick={this.showModal} ref={component => {
              this.addBtn = findDOMNode(component);
            }}
          >
            添加
          </Button>
          <Table
            columns={columns}
          />
        </Card>
        <Modal
          title={done ? null : `轮播图${current ? "添加" : "添加"}`}
          width={640}
          bodyStyle={done ? { padding: "72px 0"} : { padding: "28px 0 0"}}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default DynamicPost;
