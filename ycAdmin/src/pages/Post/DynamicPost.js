import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { findDOMNode } from "react-dom";
import { Upload, Button, message, Icon, Card, Modal, Table, Popconfirm, Divider, Input, Form, DatePicker } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Result from "@/components/Result";
import styles from "./DynamicPost.less";
import moment from 'moment';
import Axios from 'axios';
import ImageGallery from 'react-image-gallery';

const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.list,
}))
@Form.create()
class DynamicPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
    fileList: [],
    previewVisible: false,
    previewImage: '',
    loading: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "list/fetch",
      payload: {
        unixtime: 0
      }
    });
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

  beforeUpload(file) {
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
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { previewVisible, previewImage, modalVisible, fileList, visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
        okText: "添加",
        onOk: this.handleSubmit,
        onCancel: this.handleModalCancel
      };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div>Upload</div>
      </div>
    )
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
          {getFieldDecorator("path", {
            rules: [{ required: true, message: "请上传轮播图"}],
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
                {fileList.length >= 10 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="image" style={{ width: '100%' }} src={previewImage} />
              </Modal>
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

    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]

    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      //   key: 'id'
      // },
      {
        title: '轮播图',
        dataIndex: 'image',
        key: 'image',
        render: () => (
          <ImageGallery items={images} />
        )
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
          title="新建轮播图"
          className={styles.standardListForm}
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
