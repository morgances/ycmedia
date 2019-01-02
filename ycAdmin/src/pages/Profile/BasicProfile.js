import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Popover,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './Form';
import styles from './BasicProfile.less';

const tableData = [
  {
    key: '1',
    workId: '001',
    name: 'John',
    department: '2篇',
  },
  {
    key: '2',
    workId: '002',
    name: 'Jim',
    department: '7篇',
  },
  {
    key: '3',
    workId: '003',
    name: 'Joe',
    department: '9篇',
  },
];

@Form.create()
class BasicProfile extends PureComponent {
  state = {
    width: '100%',
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="用户管理"
        wrapperClassName={styles.advancedForm}
      >
        <Card bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicProfile;
