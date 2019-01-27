import React from "react";
import { findDOMNode } from "react-dom";
import { DatePicker, TimePicker, Button, Card, Modal, Form, Input, Cascader, Upload, Icon, message, Select } from "antd";
import Result from "@/components/Result";
import styles from "./Adding.less";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Editor from 'react-quill-antd';
import 'react-quill-antd/dist/index.css';
import moment from 'moment';

const date = new Date();
const Option = Select.Option;
const FormItem = Form.Item;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
@Form.create()
class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.modeOptions = {
      '0': {options: ['文化动态', '通知公告', '政策法规', '免费开放']},
      '1': {options: ['图书借阅', '服务指南', '数字资源', '好书推荐']},
      '2': {options: ['文化遗产','非遗传承']},
      '3': {options: []},
      '4': {options: ['艺术资讯','名家介绍','艺术展示','艺术场馆']},
      '5': {options: ['银川影院','艺术剧院']},
      '6': {options: ['公益性文化产品','公益性文化活动','中华优秀传统文化']},
      '7': {options: ['群众文化','银川记忆']}
    }
    this.state = {
      selectMode: '0',
      fileList: [],
      content: '',
    }
    this.selectMode = this.selectMode.bind(this)
  }

  componentDidMount() {
    this.getData();
    this.props.form.validateFields();
  }

  getData = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'list/addList',
    })
  }

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  handleChange = ({ fileList }) => this.setState({ fileList })

  beforeUploadHandle=()=>{
    this.setState(({fileData})=>({
        fileData:[...fileData],
    }))
    return false;
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined
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

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields(async (err, fieldsValue) => {
      if (err) return;
      console.log('数据：', fieldsValue);
      this.setState({
        done: true
      });
      dispatch({
        type: "list/addList",
        payload: { 
          ...fieldsValue }
      });
    });
  };
  selectMode(value) {
    this.setState({
        selectMode: value
    })
  }

  render() {
    const { fileList } = this.state;
    let modelOptions = null;
    if(this.modeOptions[this.state.selectMode].options.length !== 0) {
      modelOptions = [];
      this.modeOptions[this.state.selectMode].options.map((item, index) => {
        modelOptions.push(<Option key={index}>{item}</Option>)
      })
    }
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加封面更有助于吸引读者</div>
      </div>
    );
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: "发布",
          onOk: this.handleSubmit,
          onCancel: this.handleCancel
        };
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="发布成功"
            actions={
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
          <FormItem label="文章封面" {...this.formLayout}>
            {getFieldDecorator("image")(
                <Upload
                  action="路径"
                  className="avatar-uploader"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.handleChange}
                  beforUpload={this.beforeUploadHandle}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              )}
          </FormItem>
          <FormItem label="文章标题" {...this.formLayout}>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入文章标题" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章作者" {...this.formLayout}>
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "请输入文章作者" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章分类" {...this.formLayout} >
            {getFieldDecorator("category", {
              rules: [{ required: true, message: "请选择文章分类" }],
            })(
              <Select onChange={this.selectMode} getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择">
                <Option value="0">Culture</Option>
                <Option value="1">Book</Option>
                <Option value="2">Heritage</Option>
                <Option value="3">Travel</Option>
                <Option value="4">Art</Option>
                <Option value="5">Consumption</Option>
                <Option value="6">Brand</Option>
                <Option value="7">Interpretation</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout} >
            {getFieldDecorator("tag", {
            })(
              <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择">{modelOptions}</Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} >
            {getFieldDecorator("date",{
                initialValue: moment(date)
              })(
                <div>
                </div>
              )}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper title="添加文章">
      <Form>
        <FormItem>
          {getFieldDecorator("text", {
            initialValue: ""
          })(<Editor />)}
        </FormItem>
        <FormItem>
          <Button 
            type="primary" 
            htmlType="submit" 
            onClick={this.showModal} ref={component => {
              this.addBtn = findDOMNode(component);
            }}>
            发布
          </Button>
        </FormItem>
      </Form>
        <Modal
          title={done ? null : `文章${current ? "发布" : "添加"}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: "72px 0" } : { padding: "28px 0 0" }}
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

export default Adding;