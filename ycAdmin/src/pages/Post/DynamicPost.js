import React, { Component } from "react";
import { connect } from "dva";
import { Upload, Icon, Card, Modal } from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

class DynamicPost extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [
      {
        uid: "-1",
        name: "xxx.png",
        status: "done",
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      }
    ]
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });


  render() {
    const dispatch = this.props.dispatch;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <PageHeaderWrapper title="轮播图">
        <Card>
          <div className="clearfix">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 200 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ post }) => ({
  ...post
}))(DynamicPost);
