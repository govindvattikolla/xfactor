import React from 'react'
import { Card, Row, Col } from 'antd';
function DashboardContent() {
    return (
        <>
            <Row gutter={[16, 16]} style={{ padding: '20px', textAlign:'center' }}>
                <Col span={6}>
                    <Card title="Total students" className='Patient-count'>
                        <p>0</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total sessions" className='Patient-count'>
                        <p>0</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Billing & Payments" className='Patient-count'>
                        <p>0</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Feedbacks" className='Patient-count'>
                        <p>0</p>
                    </Card>
                </Col>  
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="student Details">
                        <p>Table will go here</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Session Details">
                        <p>Table will go here</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="billing and payments">
                        <p>Table will go here</p>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Feedbacks">
                        <p>Table will go here</p>
                    </Card>
                </Col>
            </Row>
        </>
    )

}

export default DashboardContent