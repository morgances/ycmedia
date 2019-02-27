import React from "react";
import { findDOMNode } from "react-dom";
import { Button, Card, Modal, Form, Input, Cascader, Upload, Icon, message, Select } from "antd";
import Result from "@/components/Result";
import styles from "./AddText.less";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Axios from 'axios';
import { routerRedux } from 'dva/router';

const Option = Select.Option;
const FormItem = Form.Item;
const Data = {
  '文化资讯': {'文化动态': [],'通知公告': [],'政策法规': [],'免费开放': []},
  '书香银川': {'图书借阅': [],'服务指南': [],'数字资源': [],'好书推荐': []},
  '遗脉相承': {'文化遗产': ['文化遗址','文物鉴赏','文物保护'],'非遗传承': ['项目名单','传承保护','非遗展馆','民俗活动','传承基地','传承人']},
  '银川旅游': [],
  '艺术空间': {'艺术资讯': [],'名家介绍': [],'艺术展示': ['绘画','书法','音乐','展览'],'艺术场馆': []},
  '文化消费': {'银川影院': [],'艺术剧院': ['院团介绍','剧目介绍','商业演出']},
  '文化品牌': {'公益性文化产品': [],'公益性文化活动': [],'中华优秀传统文化与民族文化': []},
  '凤城演绎': {'群众文化': ['群文活动','民间团队','公益培训'],'银川记忆': ['西夏古都','民间传说','老银川']}
}
console.log(Object.keys(Data),"category")
console.log(Object.values(Data)[0],"tagData")
console.log(Object.keys(Object.values(Data)[0]),"tag")
console.log(Object.values(Object.values(Data)[0])[0],"label")
const provinceData = ['文化资讯','书香银川','遗脉相承','银川旅游','艺术空间','文化消费','文化品牌','凤城演绎'];
console.log(provinceData.indexOf('文化资讯'))

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
@Form.create()
class AddText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: Object.keys(Object.values(Data)[0]),
      tagData: Object.values(Data)[0],
      secondTag: Object.keys(Object.values(Data)[0])[0],
      label: Object.values(Object.values(Data)[0])[0],
      thirdLabel: Object.values(Object.values(Data)[0])[0][0],
      fileList: [],
      previewVisible: false,
      previewImage: '',
      loading: false,
      file_name:"",
      imageUrl: '',
      visible: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.form.setFieldsValue({
        text: BraftEditor.createEditorState('<p></p>')
      })
    }, 1000)
  }

  handleCategoryChange = (value) => {
    console.log(value,"联动category")
    this.setState({
      tag: Object.keys(Object.values(Data)[value]),
      tagData: Object.values(Data)[value],
      secondTag: Object.keys(Object.values(Data)[value])[0]
    });
    this.props.form.setFields({
      tag: null
    })
  }

  handleTagChange = (value) => {
    console.log(value,"联动tag")
    this.setState({
      secondTag: value,
      label: Object.values(this.state.tagData)[value],
      thirdLabel: Object.values(this.state.tagData)[value][0],
    });
    this.props.form.setFields({
      label: null
    })
  }

  handleLabelChange = (value) => {
    console.log(value,"联动label")
    this.setState({
      thirdLabel: value
    })
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

  handleButtonCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { imageUrl } = this.state;
    console.log(imageUrl,"submitimageUrl")
    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        const submitData = {
          text: fieldsValue.text.toHTML()
        }
        this.setState({
          done: true,
        });
        dispatch({
          type: "list/addList",
          payload: {
            ...fieldsValue,
            text: fieldsValue.text.toHTML(),
            image: imageUrl
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

  //上传图片
  handleChange = (info) => {
    let fileList = info.fileList;
    this.setState({ fileList });
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
    console.log(formData)
    formData.append('file', info.file, info.file.name)
    Axios({
      headers: {
        'Content-Type':'multipart/form-data'
      },
      method: 'post',
      data: formData,
      url: 'http://39.98.162.91:9573/api/v1/upload'
    }).then(res => {
      if(fileList.length === 1) {
        let imgurl = res.data.data
        this.setState({
          imageUrl: imgurl
        })
      }
      else {
        let imgurl = res.data.data
        this.setState({
          imageUrl: imgurl
        })
      }
    },err => {
      console.log('err',err)
    })
  }

  beforeUpload() {
    return false
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  articlelist = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/list/basic-list/',
    }))
  }

  render() {
    const { tag, label } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const controls = [
      'undo', 'redo', 'separator',
      'font-size', 'separator',
      'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
      'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
      'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
      'link', 'media', 'hr', 'separator',
      'clear', 'separator'
    ]
    const {
      form: { getFieldDecorator, setFieldsValue }
    } = this.props;
    const { visible, done, current = {}, imageUrl } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: "发布",
          onOk: this.handleSubmit,
          onCancel: this.handleButtonCancel
        };
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            actions={
              <Button type="primary" onClick={this.articlelist}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      const categoryData = Object.keys(Data).map(category => <Option value={Object.keys(Data).indexOf(category)} key={category}>{category}</Option>)
      const tagData = tag.map(tags => <Option value={tag.indexOf(tags)} key={tags}>{tags}</Option>)
      const labelData = label.map(labels => <Option value={label.indexOf(labels)} key={labels}>{labels}</Option>)
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="文章封面" {...this.formLayout}>
            {getFieldDecorator("image", {
            })(
                <div>
                  <Upload
                    name="image"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={this.beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept="image/*"
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="image" style={{ width: '100%' }} src={imageUrl} />
                  </Modal>
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
              rules: [{ required: true, message: "请选择文章类别" }]
            })(
                <Select 
                  placeholder="请选择" 
                  onChange={this.handleCategoryChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {categoryData}
                </Select>
              )}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout} >
            {getFieldDecorator("tag", {
              initialValue: -1
            })(
                <Select 
                  placeholder="请选择" 
                  onChange={this.handleTagChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {tagData}
                </Select>
              )}
          </FormItem>
          <FormItem label="文章label" {...this.formLayout}>
            {getFieldDecorator("label", {
              initialValue: -1
            })(
                <Select 
                  placeholder="请选择" 
                  onChange={this.handleLabelChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {labelData}
                </Select>
              )}
          </FormItem>
          <FormItem {...this.formLayout} >
            {getFieldDecorator("date",{
              initialValue: new Date()
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

export default AddText;