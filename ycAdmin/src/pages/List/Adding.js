import React from "react";
import { findDOMNode } from "react-dom";
import { Button, Card, Modal, Form, Input, Select } from "antd";
import Result from "@/components/Result";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./Adding.less";
import { connect } from "dva";

import PageHeaderWrapper from "@/components/PageHeaderWrapper";

const FormItem = Form.Item;
const { Option } = Select;

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
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "list/fetch",
      payload: {
        count: 5
      }
    });
  }
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
        type: "list/submit",
        payload: { id, ...fieldsValue }
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
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入文章作者" }],
              //initialValue: current.name
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="文章标签" {...this.formLayout}>
            {getFieldDecorator("tag", {
              rules: [{ required: true, message: "请选择文章标签" }]
            })(
              <Select placeholder="请选择">
                <Option value="0">文化资讯</Option>
                <Option value="1">书香银川</Option>
                <Option value="2">遗脉相承</Option>
                <Option value="3">银川旅游</Option>
                <Option value="4">艺术空间</Option>
                <Option value="5">凤城演绎</Option>
                <Option value="6">文化消费</Option>
                <Option value="7">文化品牌</Option>
              </Select>
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
