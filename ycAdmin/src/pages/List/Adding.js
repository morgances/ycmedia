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
import Axios from 'axios';

function getBase64(img,callback) {
  const reader = new FileReader();
  reader.addEventListener('load',() => callback(reader.result));
  reader.readAsDataURL(img);
}

const date = new Date(+new Date() + 8 * 3600 * 1000);
console.log(date)
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
      loading: false,
      file_name:"",
      selectMode: '0',
      imageUrl: ''
    }
    this.selectMode = this.selectMode.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.form.setFieldsValue({
        text: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)
  }

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };

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
      if (!err) {
        const submitData = {
          text: fieldsValue.text.toHTML()
        }
        console.log(submitData)
        this.setState({
          done: true,
        });
        dispatch({
          type: "list/addList",
          payload: {
            ...fieldsValue,
            text: fieldsValue.text.toHTML()
          }
        });
      }
    });
  };

  selectMode(value) {
    this.setState({
        selectMode: value
    })
  }

  handleChange = (info) => {
    console.log('info',info)
    const isJPG = info.file.type === 'image/jpeg';
    const isPNG = info.file.type === 'image/png';
    if(!isJPG && !isPNG) {
      message.error('仅支持JPG，JPEG，PNG');
    }
    const isLt1M = info.file.size / 1024 / 1024 < 1;
    if(!isLt1M) {
      message.error('图片限制1M以下');
    }
    if(!((isJPG || isPNG) && isLt1M)) {
      return false;
    }
    let formData = new window.FormData()
    formData.append('file',info.file,info.file.name)
    Axios({
      headers: {
        'Content-Type':'multipart/form-data'
      },
      method: 'post',
      data: formData,
      url: 'http://39.98.162.91:9573/api/v1/upload'
    }).then(res => {
      console.log('res',res)
      console.log('1',this)
      if(res.data.code === 200) {
        let imgurl = res.data.result[0].photoBig
        this.setState({
          imageUrl: 'http://39.98.162.91:9573/' + imgurl
        })
      }
    },err => {
      console.log('err',err)
    })
  }

  beforeUpload(file) {
    return false
  }


  render() {
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'media', 'hr', 'separator',
      'clear', 'separator'
    ]

    let modelOptions = null;
    if(this.modeOptions[this.state.selectMode].options.length !== 0) {
      modelOptions = [];
      this.modeOptions[this.state.selectMode].options.map((item, index) => {
        modelOptions.push(<Option value={index}>{item}</Option>)
      })
    }
    const {
      form: { getFieldDecorator, setFieldsValue }
    } = this.props;
    const { visible, done, current = {}, imageUrl } = this.state;
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
            })(
                <div>
                  <Upload
                    name="image"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button><br/>
                    <p style={{marginTop: 10}}>（大小426 * 240像素，图片限制1M以下，仅支持JPG，JPEG，PNG）</p>
                  </Upload>
                </div>
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
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator("text",{
                  validateTrigger: 'onBlur',
                  rules: [{
                    required: true,
                    validator: (_, value, callback) => {
                      if (value.isEmpty()) {
                        callback('请输入文章内容')
                      } else {
                        callback()
                      }
                    }
                  }],
                })(
                  <BraftEditor
                    controls={controls}
                  ></BraftEditor>
                )}
              </FormItem>
            </Form>
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