import React from "react";
import { findDOMNode } from "react-dom";
import { Button, Card, Modal, Form, Input, Select, Cascader } from "antd";
import Result from "@/components/Result";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Adding.less";
import { connect } from "dva";

import PageHeaderWrapper from "@/components/PageHeaderWrapper";

const FormItem = Form.Item;
const options = [{
  value: '文化资讯',
  label: '文化资讯',
  children: [{
    value: '文化动态',
    label: '文化动态',
  },{
    value: '通知公告',
    label: '通知公告',
  },{
    value: '政策法规',
    label: '政策法规',
  },{
    value: '免费开放',
    label: '免费开放',
  }],
},{
  value: '书香银川',
  label: '书香银川',
  children: [{
    value: '图书借阅',
    label: '图书借阅',
  },{
    value: '服务指南',
    label: '服务指南',
  },{
    value: '数字资源',
    label: '数字资源',
  },{
    value: '好书推荐',
    label: '好书推荐',
  }]
},{
  value: '遗脉相承',
  label: '遗脉相承',
  children: [{
    value: '文化遗产',
    label: '文化遗产',
  },{
    value: '非遗传承',
    label: '非遗传承',
  }]
},{
  value: '银川旅游',
  label: '银川旅游',
},{
  value: '艺术空间',
  label: '艺术空间',
  children: [{
    value: '艺术资讯',
    label: '艺术资讯',
  },{
    value: '名家介绍',
    label: '名家介绍',
  },{
    value: '艺术展示',
    label: '艺术展示',
  },{
    value: '艺术场馆',
    label: '艺术场馆',
  }]
},{
  value: '凤城演绎',
  label: '凤城演绎',
  children: [{
    value: '群众文化',
    label: '群众文化',
  },{
    value: '银川记忆',
    label: '银川记忆',
  }]
},{
  value: '文化消费',
  label: '文化消费',
  children: [{
    value: '银川影院',
    label: '银川影院',
  },{
    value: '艺术剧院',
    label: '艺术剧院',
  }]
},{
  value: '文化品牌',
  label: '文化品牌',
}];
function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
};

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list
}))
@Form.create()
export default class Adding extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 }
  };
  handleChange(value) {
    this.setState({ text: value });
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
          // user_id: 123,
          // category: 2, 
          // tag: 3,
          // title: "asdasd",
          //author: "",
          // date: "this is time",
          ...fieldsValue }
      });
    });
  };
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const { visible, done, current = {} } = this.state;
    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : {
          okText: "保存",
          onOk: this.handleSubmit,
          onCancel: this.handleCancel
        };
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="发布成功"
            //description="一系列的信息描述，很短同样也可以带标点。"
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

          <FormItem label="文章标题" {...this.formLayout}>
            {getFieldDecorator("title", {
              rules: [{ required: true, message: "请输入文章标题" }],
              //initialValue: current.title
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章作者" {...this.formLayout}>
            {getFieldDecorator("author", {
              rules: [{ required: true, message: "请输入文章作者" }],
              //initialValue: current.name
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章分类" {...this.formLayout}>
            {getFieldDecorator("category", {
              rules: [{ required: true, message: "请选择文章标签" }]
            })(
                <Cascader options={options} onChange={onChange} placeholder="请选择" />
            )}
          </FormItem>
        </Form>
      );
    };
    return (
      <PageHeaderWrapper title="添加文章">
        <Card className={styles.listCard} bordered={false}>
          <ReactQuill
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
            style={{ height: 550 }}
          />
          <Button
            style={{ marginTop: 56 }}
            onClick={this.showModal}
            ref={component => {
              /* eslint-disable */
              this.addBtn = findDOMNode(component);
              /* eslint-enable */
            }}
          >
            发布
          </Button>
        </Card>
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
