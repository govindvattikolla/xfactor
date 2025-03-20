import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, Table, Avatar } from 'antd';
import axios from 'axios';

function DashboardContent() {
    const [totalStudents, setTotalStudents] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalFeedbacks, setTotalFeedbacks] = useState(0);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentsResponse = await axios.get("http://localhost:5000/api/students");
                // const sessionsResponse = await axios.get("http://localhost:5000/api/sessions");
                // const paymentsResponse = await axios.get("http://localhost:5000/api/payments");
                // const feedbacksResponse = await axios.get("http://localhost:5000/api/feedbacks");

                setTotalStudents(studentsResponse.data.length);
                setStudents(studentsResponse.data);
                // setTotalSessions(sessionsResponse.data.length);
                // setTotalPayments(paymentsResponse.data.length);
                // setTotalFeedbacks(feedbacksResponse.data.length);
            } catch (error) {
                message.error("Error fetching dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Avatar
                    src={
                        image && typeof image === "string" && image.startsWith("http")
                            ? image
                            : image
                            ? `http://localhost:5000${image}`
                            : "https://via.placeholder.com/50"
                    }
                    onError={(e) => {
                        if (e && e.target) {
                            e.target.src = "https://via.placeholder.com/50";
                        }
                    }}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
    ];

    return (
        <>
            <Row gutter={[16, 16]} style={{ padding: '20px', textAlign: 'center' }}>
                <Col span={6}>
                    <Card title="Total Students" className="dashboard-card" loading={loading}>
                        <p>{totalStudents}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Total Sessions" className="dashboard-card" loading={loading}>
                        <p>{totalSessions}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Billing & Payments" className="dashboard-card" loading={loading}>
                        <p>{totalPayments}</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="Feedbacks" className="dashboard-card" loading={loading}>
                        <p>{totalFeedbacks}</p>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Card title="Student Details">
                        <Table
                            columns={columns}
                            dataSource={students}
                            loading={loading}
                            rowKey="_id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default DashboardContent;
