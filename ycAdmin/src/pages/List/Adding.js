import React from "react";
import { findDOMNode } from "react-dom";
import { DatePicker, TimePicker, Button, Card, Modal, Form, Input, Cascader, Upload, Icon, message, Select } from "antd";
import Result from "@/components/Result";
import styles from "./Adding.less";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';

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
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
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

  handleEditorChange = (editorState) => {
    this.setState({
      editorState: editorState,
      //outputHTML: editorState.toHTML()
    })
  }

  uploadHandler = (param) => {

    if (!param.file) {
      return false
    }
  
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url: URL.createObjectURL(param.file)
      }])
    })

  }

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
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const submitData = {
        title: fieldsValue.title,
        //content: fieldsValue.content.toRAW() // or fieldsValue.content.toHTML()
      }
      console.log(submitData)
      console.log('数据：', fieldsValue);
      this.setState({
        done: true
      });
      dispatch({
        type: "list/addList",
        payload: { 
          ...fieldsValue }
      });
      // form.resetFields();
      // this.setState({
      //   visible: false,
      // });
    });
  };
  selectMode(value) {
    this.setState({
        selectMode: value
    })
  }

  render() {
    const { fileList, editorState, outputHTML } = this.state;
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'letter-spacing', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      // 'image', 'separator',
      'clear', 'separator',
    ]
    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={this.uploadHandler}
          >
            {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <Icon type="picture" theme="filled" />
            </button>
          </Upload>
        )
      }
    ]
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
              initialValue: "标题",
              rules: [{ required: true, message: "请输入文章标题" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章作者" {...this.formLayout}>
            {getFieldDecorator("author", {
              initialValue: "作者",
              rules: [{ required: true, message: "请输入文章作者" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章分类" {...this.formLayout} >
            {getFieldDecorator("category", {
              initialValue: "0",
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
                initialValue: moment(date).add(8, 'hours')
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
        <Card bordered={false}>
          <div className="editor-wrapper">
              <FormItem>
                {getFieldDecorator('text', {
                  validateTrigger: 'onBlur',
                })(
                  <BraftEditor
                    className="my-editor"
                    controls={controls}
                    extendControls={extendControls}
                    placeholder="请输入文章内容"
                    onChange={this.handleEditorChange}
                  />
                )}
              </FormItem>
          </div>
        </Card>
        <Button
          style={{ marginTop: 20 }}
          type="primary" 
          htmlType="submit" 
          onClick={this.showModal} ref={component => {
            this.addBtn = findDOMNode(component);
          }}
        >
          发布
        </Button>
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