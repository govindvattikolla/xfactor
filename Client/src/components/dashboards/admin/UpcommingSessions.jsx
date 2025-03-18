import React, { useEffect, useState } from "react";
import { Card, Row, Col, Avatar, Button, message } from "antd";
import axios from "axios";

// Function to format the timestamp (to show it in a readable format)
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const UpcomingSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the sessions from the backend
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/sessions");
                setSessions(response.data);
            } catch (error) {
                message.error("Error fetching sessions");
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Upcoming Sessions</h2>
            <Row gutter={[16, 16]}>
                {sessions.map((session) => (
                    <Col key={session._id} span={8}>
                        <Card
                            hoverable
                            cover={
                                <Avatar
                                    size={200}
                                    src={`http://localhost:5000${session.image}`}
                                    alt={session.title}
                                    style={{ width: "100%", height: "auto", borderRadius: 8 }}
                                />
                            }
                        >
                            <h3>{session.title}</h3>
                            <p>{formatTimestamp(session.timestamp)}</p>
                            <Button type="primary" block>
                                Join Session
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default UpcomingSessions;
