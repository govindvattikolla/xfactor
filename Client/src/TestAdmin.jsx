import React, { useState } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/dashboards/admin/sidebar';
import './components/dashboards/admin/adminStyles.css';
import AdminHeader from './components/dashboards/admin/adm_header';
import DashboardContent from './components/dashboards/admin/DashboardCont';
import Students from "./components/dashboards/admin/Students";
import Appointments from './components/dashboards/admin/appointment';
import MedicalRecords from './components/dashboards/admin/MedicalRec';
import BillingPayments from './components/dashboards/admin/payment';
import UpdatePatient from './components/dashboards/admin/updatePatient';
const { Sider, Header, Content } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Header Section */}
                <Header className='Header'>
                    <AdminHeader />
                </Header>

                <Layout>
                    {/* Sidebar Section */}
                    <Sider
                        theme='light'
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className='sider'
                        style={{ overflowY: "auto" }}
                        onMouseEnter={() => setCollapsed(false)}
                        onMouseLeave={() => setCollapsed(true)}
                    >
                        <Sidebar />
                    </Sider>

                    {/* Main Content Section */}
                    <Layout style={{ marginLeft: collapsed ? '80px' : '250px', transition: 'margin-left 0.3s' }}>
                        <Content className='Content'>
                            <Routes>
                                <Route path="/" element={<DashboardContent />} />
                                <Route path="/dashboard" element={<DashboardContent />} />
                                <Route path="/students/add" element={<Students />} />
                                <Route path="/patients/update" element={<UpdatePatient />} />
                                <Route path="/patients/" element={<Students/>} />
                                <Route path="/appointments" element={<Appointments />} />
                                <Route path="/medicalRecords" element={<MedicalRecords />} />
                                <Route path="/billing" element={<BillingPayments />} />
                                {/* Add a 404 Page Not Found Route */}
                                <Route path="*" element={<h2>Page Not Found</h2>} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;