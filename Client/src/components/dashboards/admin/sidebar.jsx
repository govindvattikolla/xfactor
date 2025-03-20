import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  BankOutlined,
  BellOutlined,
  TeamOutlined
} from '@ant-design/icons';
import "./adminStyles.css"


const Sidebar = () => {
  return (
    <Menu mode='inline' className='menu-bar' defaultSelectedKeys={['dashboard']} >
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard" >Overview</Link>
      </Menu.Item>

      {/* students Management */}
      <Menu.SubMenu key="patients" icon={<TeamOutlined />} title="students">
        <Menu.Item key="add-patient">
          <Link to="/students/add">Add student</Link>
        </Menu.Item>
        {/* <Menu.Item key="update-patient">
          <Link to="/patients/update">Update student Info</Link>
        </Menu.Item> */}
        <Menu.Item key="view-patient">
          <Link to="/students/view">Manage Students</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* session Management */}
      <Menu.SubMenu key="sessions" icon={<CalendarOutlined />} title="Session management">
        <Menu.Item key="upload-session">
          <Link to="/sessions/upload">Upload Recordings</Link>
        </Menu.Item>
        <Menu.Item key="live-sessions">
          <Link to="/sessions/add">Add upcoming sessions</Link>
        </Menu.Item>
        <Menu.Item key="add-courses">
          <Link to="/courses/add">Add courses</Link>
        </Menu.Item>
        <Menu.Item key="view-calendar">
          <Link to="/sessions/schedule">Schedule upcoming sessions</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Billing & Payments */}
      <Menu.SubMenu key="billingPayments" icon={<BankOutlined />} title="Billing & Payment">
        <Menu.Item key="generate-invoice">
          <Link to="/billing/invoice">Generate Invoice</Link>
        </Menu.Item>
        <Menu.Item key="payment-processing">
          <Link to="/billing/payment">Payment Processing</Link>
        </Menu.Item>
        <Menu.Item key="view-transactions">
          <Link to="/billing/transactions">View Transactions</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="notificatons" icon={<BellOutlined />}>
        <Link to="/notifications">Notifications</Link>
      </Menu.Item>
      <Menu.Item key="feedback" icon={<FileTextOutlined />} >
        <Link to="/feedback">Feedback</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;