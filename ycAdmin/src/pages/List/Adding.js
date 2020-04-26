import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  DatePicker,
  TimePicker,
  Button,
  Card,
  Modal,
  Form,
  Input,
  Cascader,
  Upload,
  Icon,
  message,
  Select,
} from 'antd';
import Result from '@/components/Result';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Axios from 'axios';
import { routerRedux } from 'dva/router';
import styles from './Adding.less';

const Option = Select.Option;
const FormItem = Form.Item;

const provinceData = [
  '文化资讯',
  '书香银川',
  '遗脉相承',
  '银川旅游',
  '艺术空间',
  '文化消费',
  '文化品牌',
  '凤城演绎',
];
const cityData = {
  文化资讯: ['文化动态', '通知公告', '政策法规', '免费开放'],
  书香银川: ['图书借阅', '服务指南', '数字资源', '好书推荐'],
  遗脉相承: ['文化遗产', '非遗传承'],
  银川旅游: [],
  艺术空间: ['艺术资讯', '名家介绍', '艺术展示', '艺术场馆'],
  文化消费: ['银川影院', '艺术剧院'],
  文化品牌: ['公益性文化产品', '公益性文化活动', '中华优秀传统文化与民族文化'],
  凤城演绎: ['群众文化', '银川记忆'],
};
const secondCityData = {
  文化动态: [],
  通知公告: [],
  政策法规: [],
  免费开放: [],
  图书借阅: [],
  服务指南: [],
  数字资源: [],
  好书推荐: [],
  文化遗产: ['文化遗址', '文物鉴赏', '文物保护'],
  非遗传承: ['项目名单', '传承保护', '非遗展馆', '民俗活动', '传承基地', '传承人'],
  艺术资讯: [],
  名家介绍: [],
  艺术展示: ['绘画', '书法', '音乐', '展览'],
  艺术场馆: [],
  银川影院: [],
  艺术剧院: ['院团介绍', '剧目介绍', '商业演出'],
  公益性文化产品: [],
  公益性文化活动: [],
  中华优秀传统文化与民族文化: [],
  群众文化: ['群文活动', '民间团队', '公益培训'],
  银川记忆: ['西夏古都', '民间传说', '老银川'],
};

@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class Adding extends React.Component {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      secondCity: cityData[provinceData[0]][0],
      cities1: [],
      thirdCity: secondCityData[cityData[provinceData[0]][0]][0],
      previewVisible: false,
      previewImage: '',
      loading: false,
      file_name: '',
      fileList: [],
      imageUrl: '',
    };
  }

  componentDidMount() {
    const { dispatch, match, loading } = this.props;
    if (this.props.rule.data === {}) {
      loading === true;
    } else {
      loading === false;
    }
    const aid = Number(match.params.aid);
    dispatch({
      type: 'rule/text',
      payload: {
        aid,
      },
    });
    setTimeout(() => {
      this.props.form.setFieldsValue({
        text: BraftEditor.createEditorState(`${this.props.rule.data.text}`),
        author: this.props.rule.data.author,
        category: this.props.rule.data.category,
        tag: this.props.rule.data.tag,
        label: this.props.rule.data.label,
        title: this.props.rule.data.title,
        image: this.props.rule.data.image,
      });
      this.setState({
        fileList:
          this.props.rule.data.image === '' ? [] : [{ uid: 1, url: this.props.rule.data.image }],
      });
    }, 500);
  }

  // 联动
  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
    this.props.form.setFields({
      tag: null,
    });
  };

  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
      cities1: secondCityData[value],
      thirdCity: secondCityData[value][0],
    });
    this.props.form.setFields({
      label: null,
    });
  };

  onThirdCityChange = value => {
    this.setState({
      thirdCity: value,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleButtonCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imageUrl } = this.state;
    const { dispatch, form, match } = this.props;
    const aid = Number(match.params.aid);
    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      console.log(imageUrl,"image")
      if (!err) {
        const submitData = {
          text: fieldsValue.text.toHTML(),
        };
        this.setState({
          done: true,
        });
        dispatch({
          type: 'list/updateArticle',
          payload: {
            ...fieldsValue,
            aid,
            text: fieldsValue.text.toHTML(),
            image: imageUrl === undefined ? "" : imageUrl,
          },
        });
      }
    });
  };

  selectMode(value) {
    this.setState({
      selectMode: value,
    });
  }

  // 上传图片
  handleChange = info => {
    const fileList = info.fileList;
    this.setState({ fileList });
    // const isJPG = info.file.type === 'image/jpeg';
    // const isPNG = info.file.type === 'image/png';
    // if(!isJPG && !isPNG) {
    //   message.error('仅支持JPG，JPEG，PNG');
    // }
    // const isLt1M = info.file.size / 1024 / 1024 < 1;
    // if(!isLt1M) {
    //   message.error('图片限制1M以下');
    // }
    // if(!((isJPG || isPNG) && isLt1M)) {
    //   return false;
    // }
    const formData = new window.FormData();
    formData.append('file', info.file, info.file.name);
    console.log(formData.append('file', info.file, info.file.name), "what is formData")
    Axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      method: 'post',
      data: formData,
      url: 'http://39.105.141.168:9573/api/v1/upload',
    }).then(
      res => {
        if (fileList.length === 1) {
          const imgurl = res.data.data;
          this.setState({
            imageUrl: imgurl,
          });
        } else {
          const imgurl = res.data.data;
          this.setState({
            imageUrl: imgurl,
          });
        }
      },
      err => false
    );
  };

  beforeUpload() {
    return false;
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  articlelist = () => {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.push({
        pathname: '/list/basic-list/',
      })
    );
  };

  render() {
    const { previewVisible, previewImage, cities, cities1, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const controls = [
      'undo',
      'redo',
      'separator',
      'font-size',
      'separator',
      'text-color',
      'bold',
      'italic',
      'underline',
      'strike-through',
      'separator',
      'remove-styles',
      'emoji',
      'separator',
      'text-indent',
      'text-align',
      'separator',
      'headings',
      'list-ul',
      'list-ol',
      'blockquote',
      'code',
      'separator',
      'link',
      'media',
      'hr',
      'separator',
      'clear',
      'separator',
    ];

    const {
      form: { getFieldDecorator, setFieldsValue },
    } = this.props;
    const { visible, done, current = {}, imageUrl } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: '保存',
          onOk: this.handleSubmit,
          onCancel: this.handleButtonCancel,
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
      const categoryData = provinceData.map(province => <Option key={province}>{province}</Option>);
      const tagData = cities.map(city => <Option key={city}>{city}</Option>);
      const labelData = cities1.map(city1 => <Option key={city1}>{city1}</Option>);
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="文章封面" {...this.formLayout}>
            {getFieldDecorator('image')(
              <div>
                <Upload
                  name="image"
                  listType="picture-card"
                  fileList={[...this.state.fileList]}
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
            {getFieldDecorator('title', {
              initialValue: this.props.rule.data.title || '',
              rules: [{ required: true, message: '请输入文章标题' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章作者" {...this.formLayout}>
            {getFieldDecorator('author', {
              initialValue: this.props.rule.data.author || '',
              rules: [{ required: true, message: '请输入文章作者' }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章分类" {...this.formLayout}>
            {getFieldDecorator('category', {
              initialValue: this.props.rule.data.category || '',
              rules: [{ required: true, message: '请选择文章分类' }],
            })(
              <Select
                onChange={this.handleProvinceChange}
                getPopupContainer={triggerNode => triggerNode.parentNode}
              >
                {categoryData}
              </Select>
            )}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout}>
            {getFieldDecorator('tag', {
              initialValue: this.props.rule.data.tag || '',
            })(
              !this.props.rule.data.tag && tagData.length === 0 ? <Select disabled /> :
              <Select
                onChange={this.onSecondCityChange}
                getPopupContainer={triggerNode => triggerNode.parentNode}
              >
                {tagData}
              </Select>
            )}
          </FormItem>
          <FormItem label="文章标记" {...this.formLayout}>
            {getFieldDecorator('label', {
              initialValue: this.props.rule.data.label || '',
            })(
              !this.props.rule.data.label && labelData.length === 0 ? <Select disabled /> :
              <Select
                onChange={this.onThirdCityChange}
                getPopupContainer={triggerNode => triggerNode.parentNode}
              >
                {labelData}
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout}>
            {getFieldDecorator('date', {
              initialValue: new Date(),
            })(<div />)}
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
                {getFieldDecorator('text', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      validator: (_, value, callback) => {
                        if (value.isEmpty()) {
                          callback('请输入文章内容');
                        } else {
                          callback();
                        }
                      },
                    },
                  ],
                })(<BraftEditor controls={controls} />)}
              </FormItem>
            </Form>
          </div>
        </Card>
        <Button
          style={{ marginTop: 15 }}
          type="primary"
          htmlType="submit"
          onClick={this.showModal}
          ref={component => {
            this.addBtn = findDOMNode(component);
          }}
        >
          发布
        </Button>
        <Modal
          title={done ? null : `文章${current ? '发布' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
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
