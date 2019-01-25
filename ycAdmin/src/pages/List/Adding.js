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

function getRule(res) {

  const params = parse(url, true).query;

  let dataSource = this.props;
  console.log(dataSource,"0")

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.author) {
    dataSource = dataSource.filter(data => data.author.indexOf(params.author) > -1);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

const date = new Date();
const Option = Select.Option;
const provinceData = ['文化资讯','书香银川','遗脉相承','银川旅游','艺术空间','文化消费','文化品牌','凤城演绎'];
const cityData = {
  文化资讯: ['文化动态','通知公告','政策法规','免费开放'],
  书香银川: ['图书借阅','服务指南','数字资源','好书推荐'],
  遗脉相承: ['文化遗产','非遗传承'],
  银川旅游: [],
  艺术空间: ['艺术资讯','名家介绍','艺术展示','艺术场馆'],
  文化消费: ['银川影院','艺术剧院'],
  文化品牌: ['公益性文化产品','公益性文化活动','中华优秀传统文化与民族文化'],
  凤城演绎: ['群众文化','银川记忆']
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
  文化遗产: ['文化遗址','文物鉴赏','文物保护'],
  非遗传承: ['项目名单','传承保护','非遗展馆','民俗活动','传承基地','传承人'],
  艺术资讯: [],
  名家介绍: [],
  艺术展示: ['绘画','书法','音乐','展览'],
  艺术场馆: [],
  银川影院: [],
  艺术剧院: ['院团介绍','剧目介绍','商业演出'],
  公益性文化产品: [],
  公益性文化活动: [],
  中华优秀传统文化与民族文化: [],
  群众文化: ['群文活动','民间团队','公益培训'],
  银川记忆: ['西夏古都','民间传说','老银川']
};
console.log(secondCityData[cityData[provinceData[0]][0]],"5")
const FormItem = Form.Item;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
@Form.create()
class Adding extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
    cities1: secondCityData[cityData[provinceData[0]][0]],
    thirdCity: secondCityData[cityData[provinceData[0]][0]][0],
    fileList: [],
    content: '',

  }

  constructor(props) {
    super(props);
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

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
      cities1: secondCityData[value],
      thirdCity: secondCityData[value][0],
    });
  }

  onThirdCityChange = (value) => {
    this.setState({
      thirdCity: value,
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
    const { current } = this.state;
    const id = current ? current.id : "";

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
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

  render() {
    const { cities, cities1, fileList } = this.state;
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
          <FormItem label="文章分类" {...this.formLayout}>
            {getFieldDecorator("category", {
              initialValue: provinceData[0],
              rules: [{ required: true, message: "请选择文章类别" }]
            })(
                <Select
                  onChange={this.handleProvinceChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  {provinceData.map(province => <Option key={province}>{province}</Option>)}
                </Select>
              )}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout}>
            {getFieldDecorator("tag", {
              initialValue: this.state.secondCity,
            })(
                <Select
                  onChange={this.onSecondCityChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  notFoundContent
                >
                  {cities.map(city => <Option key={city}>{city}</Option>)}
                </Select>
              )}
          </FormItem>
          <FormItem label="文章label" {...this.formLayout}>
            {getFieldDecorator("label", {
              initialValue: this.state.thirdCity,
            })(
                <Select
                  onChange={this.onThirdCityChange}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  notFoundContent
                >
                  {cities1.map(city1 => <Option key={city1}>{city1}</Option>)}
                </Select>
              )}
          </FormItem>
          <FormItem {...this.formLayout} >
            {getFieldDecorator("date",{
                initialValue:moment(date)
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
      <Form onSubmit={this.handleSubmit}>
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