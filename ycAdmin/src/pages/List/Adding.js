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

const date = new Date(+new Date() + 8 * 3600 * 1000);
console.log(date)
var length = 0;
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
      fileList: [],
      loading: false,
      file_name:"",
      selectMode: '0',
      content: "",
      editorState: BraftEditor.createEditorState(null)
    }
    this.selectMode = this.selectMode.bind(this)
  }

  componentDidMount() {
    this.props.form.validateFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'list/addList',
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   if ('value' in nextProps) {
  //       const editorState = nextProps.value;
  //       this.setState({
  //           editorState,
  //       });
  //   }
  // }

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

  handleEditorChange = (editorState) => {
    this.setState({
      editorState
      //outputHTML: editorState.toHTML()
    })
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
    });
  };

  selectMode(value) {
    this.setState({
        selectMode: value
    })
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    console.log(e.fileList.length)
    length = e.fileList.length;
    return e && e.fileList;
  }

  render() {
    const { outputHTML, editorState } = this.state;
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'separator', 'hr', 'separator',
      'clear', 'separator'
    ]
    //富文本上传图片
    const onSuccess = (file) => {
      this.setState({
        editorState: ContentUtils.insertMedias(editorState, [{
          type: 'IMAGE',
          url: file.url,
        }]),
      })
    }

    const uploaderProps = {
      action: "http://39.98.162.91:9573/api/v1/upload",
      multiple: true,
    }

    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <Upload
            name="files[]"
            accept="image/*"
            showUploadList={false}
            onSuccess={onSuccess}
            {...uploaderProps}
            //onChange = {this.handleUploadChange}
            customRequest={this.uploadHandler}
          >
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
        modelOptions.push(<Option value={index}>{item}</Option>)
      })
    }
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
            {getFieldDecorator("image", {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile
            })(
                <Upload
                  name="image"
                  listType="picture"
                  action="http://39.98.162.91:9573/api/v1/upload"
                >
                  <Button disabled={length >= 1}>
                    <Icon type="upload" /> Click to upload
                  </Button>
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
              initialValue: 0,
              rules: [{ required: true, message: "请选择文章分类" }],
            })(
              <Select onChange={this.selectMode} getPopupContainer={triggerNode => triggerNode.parentNode} placeholder="请选择">
                <Option value={0}>Culture</Option>
                <Option value={1}>Book</Option>
                <Option value={2}>Heritage</Option>
                <Option value={3}>Travel</Option>
                <Option value={4}>Art</Option>
                <Option value={5}>Consumption</Option>
                <Option value={6}>Brand</Option>
                <Option value={7}>Interpretation</Option>
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
              initialValue: date
            })(
              <div></div>
            )}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper title="添加文章">
        <Card bordered={false}>
          <div className="editor-wrapper">
            <BraftEditor
                onChange={this.handleEditorChange}
                value={editorState}
                controls={controls}
                extendControls= {extendControls}
            />
          </div>
        </Card>
        <Button
          style={{ marginTop: 15 }}
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