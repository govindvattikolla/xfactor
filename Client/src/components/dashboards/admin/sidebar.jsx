import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DashboardOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  FileTextOutlined, 
  BankOutlined,
  BellOutlined,
  TeamOutlined
} from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu mode='inline' className='menu-bar' defaultSelectedKeys={['dashboard']}>
      {/* Dashboard */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        <Link to="/dashboard">Overview</Link>
      </Menu.Item>

      {/* students Management */}
      <Menu.SubMenu key="patients" icon={<TeamOutlined />} title="students">
        <Menu.Item key="add-patient">
          <Link to="/patients/add">Add student</Link>
        </Menu.Item>
        <Menu.Item key="update-patient">
          <Link to="/patients/update">Update student Info</Link>
        </Menu.Item>
        <Menu.Item key="view-patient">
          <Link to="/patients/view">View student Details</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* session Management */}
      <Menu.SubMenu key="appointments" icon={<CalendarOutlined />} title="Session management">
        <Menu.Item key="schedule-appointment">
          <Link to="/appointments/schedule">upload session</Link>
        </Menu.Item>
        <Menu.Item key="reschedule-appointment">
          <Link to="/appointments/reschedule">schedule upcomming sessions</Link>
        </Menu.Item>
        <Menu.Item key="view-calendar">
          <Link to="/appointments/calendar">live sessions</Link>
        </Menu.Item>
      </Menu.SubMenu>

      {/* Trainer Management */}
      <Menu.SubMenu key="medicalRecords" icon={<UserOutlined />} title="Trainers">
        <Menu.Item key="create-record">
          <Link to="/medical-records/create">Create a Trainer</Link>
        </Menu.Item>
        <Menu.Item key="update-record">
          <Link to="/medical-records/update">Update Trainer Info</Link>
        </Menu.Item>
        <Menu.Item key="view-history">
          <Link to="/medical-records/history">View Trainer Details</Link>
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
      <Menu.Item key="feedback" icon={<FileTextOutlined />}>
        <Link to="/feedback">Feedback</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;