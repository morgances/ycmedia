import React, { Fragment } from "react";
import Link from "umi/link";
import { Icon } from "antd";
import GlobalFooter from "@/components/GlobalFooter";
import styles from "./UserLayout.less";

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> Oiar
  </Fragment>
);

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>后台管理</span>
              </Link>
            </div>
            <div className={styles.desc}>银川后台管理系统</div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default UserLayout;
