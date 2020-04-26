import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { findDOMNode } from "react-dom";
import { Avatar, Upload, Button, message, Icon, Card, Modal, Table, Popconfirm, Divider, Input, Form, DatePicker } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import Result from "@/components/Result";
import styles from "./DynamicPost.less";
import moment from 'moment';
import Axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { routerRedux } from "dva/router";
import { getToken } from "../../services/token";

const FormItem = Form.Item;
@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class DynamicPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fileList: this.props.list.data ? [{ uid: `${this.props.list.data.BannerId}`, url: `${this.props.list.data.ImagePath}`}]: [],
      previewVisible: false,
      imageUrl: '',
      loading: false,
      visible: false,
      name: '',
      previewImage: '',
    };
  }

  componentDidMount() {
    const { dispatch, loading, rule } = this.props;
    if(rule.data === {}) {
      loading === true
    } else {
      loading === false
    }
    dispatch({
      type: "list/fetch",
      payload: {}
    });
  };

  deleteConfirm = BannerId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/removePicture',
      payload: {
        BannerId
      },
    });
    message.success('删除成功')
    this.componentDidMount()
  }

  handleDone = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false
    });
  };

  handlePictureDone = () => {
    if(this.state.done === true) {
      this.componentDidMount()
    }
    this.setState({
      done: false,
      visible: false
    })
  }

  handleModalCancel = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
      fileList: []
    });
  };

  showEditModal = (id) => {
    const { BannerId } = id;
    const { dispatch } = this.props;
    dispatch ({
      type: 'list/picture',
      payload: {
        BannerId
      }
    })
    this.setState({
      visible: true,
      current: id,
      fileList: [{uid: 2, url: id.ImagePath}]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { imageUrl, current }= this.state;
    const { dispatch, form } = this.props;
    const BannerId = current ? current.BannerId : '';
    // setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({
          done: true,
        });
        dispatch({
          type: "list/addPictureList",
          payload: {
            BannerId,
            ...fieldsValue,
            ImagePath: imageUrl,
          }
        });
      }
    });
  };

  formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  //上传图片
  handleChange = (info) => {
    const { dispatch } = this.props;
    let fileList = info.fileList;
    let value = info.file;
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
    let formData = new FormData()
    if (!value.url) {
      formData.append('file',info.file,info.file.name)
    }
    // dispatch({
    //   type: "list/upload",
    //   payload: {
    //     value
    //   },
    // });
    let token = getToken()
    Axios({
      headers: {
        'Content-Type':'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      method: 'post',
      data: formData,
      url: 'http://39.105.141.168:9573/api/v1/upload'
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
      return false
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
    const {
      form: { getFieldDecorator },
      list: { list: { data } },
      rowKey
    } = this.props;
    const { previewVisible, modalVisible, visible, done, current = {}, imageUrl, fileList, previewImage } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
        okText: "保存",
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
            actions={
              <Button loading={this.state.loading} type="primary" onClick={this.handlePictureDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="轮播图名称" {...this.formLayout}>
            {getFieldDecorator("Name", {
              initialValue: current.Name || '',
              rules: [{ required: true, message: '请输入轮播图名称' }],
              validateTrigger: 'onBlur',
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="上传图片" {...this.formLayout}>
          {getFieldDecorator("ImagePath", {
            initialValue: current.ImagePath || '',
            rules: [{ required: true, message: "请上传轮播图"}]
          })(
            <div>
              <Upload
                name="ImagePath"
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
        </Form>
      )
    }

    const columns = [
      {
        title: '轮播图ID',
        dataIndex: 'BannerId',
        key: 'BannerId'
      },
      {
        title: '轮播图名称',
        dataIndex: 'Name',
        key: 'Name',
      },
      {
        title: '轮播图',
        dataIndex: 'ImagePath',
        key: 'ImagePath',
        render: (text, record) => (
          <img src={record.ImagePath} alt="logo" height={ 90 } width={ 90 } />
        )
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Popconfirm
              title="确定删除？"
              onConfirm={() => this.deleteConfirm(record.BannerId)}
              okText="确认"
              cancelText="取消"
            >
              <a>删除</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a
              onClick={e => {
                e.preventDefault();
                this.showEditModal(record);
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
            type="dashed"
            style={{ width: "100%", marginBottom: 20 }}
            icon="plus" 
            onClick={this.showModal} 
            // ref={component => {
            //   this.addBtn = findDOMNode(component);
            // }}
          >
            添加轮播图
          </Button>
          <Table
            bordered
            rowKey={rowKey || 'BannerId'}
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
        </Card>
        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加轮播图'}`}
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
