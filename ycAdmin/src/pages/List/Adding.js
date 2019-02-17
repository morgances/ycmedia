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

const date = new Date();
const Option = Select.Option;
const FormItem = Form.Item;

const categoryData = {
  '文化资讯': 0,
  '书香银川': 1,
  '遗脉相承': 2,
  '银川旅游': 3,
  '艺术空间': 4,
  '文化消费': 5,
  '文化品牌': 6,
  '凤城演绎': 7
};
const tagData = {
  0: {
    '文化动态': 0,
    '通知公告': 1,
    '政策法规': 2,
    '免费开放': 3
  },
  1: {
    '图书借阅': 4,
    '服务指南': 5,
    '数字资源': 6,
    '好书推荐': 7
  },
  2: {
    '文化遗产': 8,
    '非遗传承': 9
  },
  3: [],
  4: {
    '艺术资讯': 10,
    '名家介绍': 11,
    '艺术展示': 12,
    '艺术场馆': 13
  },
  5: {
    '银川影院': 14,
    '艺术剧院': 15
  },
  6: {
    '公益性文化产品': 16,
    '公益性文化活动': 17,
    '中华优秀传统文化与民族文化': 18
  },
  7: {
    '群众文化': 19,
    '银川记忆': 20
  }
};
console.log(Object.values(Object.values(tagData)[2])[0],'0')
console.log(Object.values(Object.values(tagData)[Object.values(categoryData)[0]]),'1')
const secondTagData = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: {
    '文化遗址': 0,
    '文物鉴赏': 1,
    '文物保护': 2
  },
  9: {
    '项目名单': 0,
    '传承保护': 1,
    '非遗展馆': 2,
    '民俗活动': 3,
    '传承基地': 4,
    '传承人': 5
  },
  10: [],
  11: [],
  12: {
    '绘画': 0,
    '书法': 1,
    '音乐': 2,
    '展览': 3
  },
  13: [],
  14: [],
  15: {
    '院团介绍': 0,
    '剧目介绍': 1,
    '商业演出': 2
  },
  16: [],
  17: [],
  18: [],
  19: {
    '群文活动': 0,
    '民间团队': 1,
    '公益培训': 2
  },
  20: {
    '西夏古都': 0,
    '民间传说': 1,
    '老银川': 2
  }
};
@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [{uid: '0', url: `${this.props.rule.data[0].image}`}],
      previewVisible: false,
      previewImage: '',
      loading: false,
      file_name:"",
      imageUrl: '',
      tags: Object.keys(Object.values(tagData)[Object.values(categoryData)[0]]),
      secondTag: Object.values(Object.values(tagData)[Object.values(categoryData)[0]])[0],
      labels: Object.keys(Object.values(secondTagData)[Object.values(Object.values(tagData)[Object.values(categoryData)[0]])[0]]),
      thirdLabel: Object.keys(Object.values(secondTagData)[Object.values(Object.values(tagData)[Object.values(categoryData)[0]])[0]])[0],
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    // let reParam;
    // if(match.params) {
    //   reParam = match.params;
    //   sessionStorage.setItem('aid',reParam);
    // } else {
    //   reParam = sessionStorage.getItem('aid');
    // }
    // console.log(sessionStorage.setItem('aid',reParam),'12')
    // this.setState ({
    //   reParam
    // })
    const aid = Number(match.params.aid);
    dispatch({
      type: "rule/text",
      payload: {
        aid
      }
    });
    console.log(aid)
    setTimeout(() => {
      this.props.form.setFieldsValue({
      text: BraftEditor.createEditorState(`${this.props.rule.data[0].text}`)
      })
    }, 1000)
  }
//联动
  handleCategoryChange = (value) => {
    this.setState({
      tags: Object.keys(Object.values(tagData)[value]),
      secondTag: Object.values(Object.values(tagData)[value])[0],
    });
  }

  onSecondTagChange = (value) => {
    this.setState({
      secondTag: value,
      labels: Object.keys(Object.values(secondTagData)[value]),
      thirdLabel: Object.keys(Object.values(secondTagData)[value])[0],
    }); 
  }

  onThirdLabelChange = (value) => {
    this.setState({
      thirdLabel: value,
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
    const { dispatch, form, match } = this.props;
    const aid = Number(match.params.aid);
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
          type: "list/updateList",
          payload: {
            ...fieldsValue,
            aid,
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

  render() {
    const { previewVisible, previewImage, tags, labels, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    console.log(this.props,'9')

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
                    <img alt="image" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
            )}
          </FormItem>
          <FormItem label="文章标题" {...this.formLayout}>
            {getFieldDecorator("title", {
              initialValue: this.props.rule.data[0].title,
              rules: [{ required: true, message: "请输入文章标题" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章作者" {...this.formLayout}>
            {getFieldDecorator("author", {
              initialValue: this.props.rule.data[0].author,
              rules: [{ required: true, message: "请输入文章作者" }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章分类" {...this.formLayout} >
            {getFieldDecorator("category", {
              initialValue: this.props.rule.data[0].category,
              onChange: this.handleCategoryChange,
              rules: [{ required: true, message: "请选择文章分类" }],
            })(
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {Object.keys(categoryData).map((category, index) => <Option key={category} value={index}>{category}</Option>)}
                </Select>
            )}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout} >
            {getFieldDecorator("tag", {
              initialValue: this.props.rule.data[0].tag,
              onChange: this.onSecondTagChange
            })(
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {tags.map((tag, index) => <Option key={tag} value={index}>{tag}</Option>)}
                </Select>
            )}
          </FormItem>
          <FormItem label="文章label" {...this.formLayout}>
            {getFieldDecorator("label", {
              initialValue: this.props.rule.data[0].label,
              onChange: this.onThirdLabelChange
            })(
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {labels.map((label, index) => <Option key={label} value={index}>{label}</Option>)}
                </Select>
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
      <PageHeaderWrapper title="编辑文章">
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