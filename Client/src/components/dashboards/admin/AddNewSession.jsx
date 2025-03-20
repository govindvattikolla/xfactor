import React, { useState } from "react";
import { Input, Button, DatePicker, Upload, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const AddSession = () => {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [timestamp, setTimestamp] = useState(null);
    const [category, setCategory] = useState("");  
    const [description, setDescription] = useState("");  

    // Handle image upload response
    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            setImage(info.file.response.filePath); // The response from server contains the file path
        }
    };

    // Handle form submission
    const handleFormSubmit = async () => {
        if (!image || !title || !timestamp || !category || !description) {
            message.error("Please fill in all fields");
            return;
        }
    
        const requestData = {
            image,
            title,
            timestamp: new Date(timestamp),  // Convert to Date
            category,
            description
        };
    
        console.log("Sending Data to Backend:", requestData);
    
        try {
            const response = await axios.post("http://localhost:5000/api/sessions/add", requestData);
            message.success("Session added successfully");
            alert("Session added successfully");
    
            // Clear form after submission
            setImage(null);
            setTitle("");
            setTimestamp(null);
            setCategory("");
            setDescription("");
        } catch (error) {
            console.error("Error adding session:", error.response?.data || error);
            message.error("Error adding session");
            alert("Error adding session");
        }
    };
    
    
    
    return (
        <div style={styles.container}>
            <Form layout="vertical" onFinish={handleFormSubmit} style={styles.form}>
                <h3 style={{textAlign:"center",marginBottom:"20px"}}>Add Upcomming sessions</h3>
                {/* Session Title */}
                <Form.Item label="Session Title">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter session title"
                    />
                </Form.Item>

                {/* Session Image */}
                <Form.Item label="Session Image">
                    <Upload
                        name="image"
                        action="http://localhost:5000/api/upload/session"  
                        listType="picture"
                        onChange={handleImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<PlusOutlined />}>Upload Image</Button>
                    </Upload>
                    {image && (
                        <p className="mt-2 text-gray-600">Selected File: {image.split('/').pop()}</p> 
                    )}
                </Form.Item>

                {/* Session Date and Time */}
                <Form.Item label="Session Date and Time">
                    <DatePicker
                        showTime
                        value={timestamp ? dayjs(timestamp) : null} // Convert string to dayjs object
                        onChange={(date, dateString) => setTimestamp(dateString)} // Set timestamp as string
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="Select session date and time"
                    />
                </Form.Item>

                {/* Session Category */}
                <Form.Item label="Session Category">
                    <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category (course)"
                    />
                </Form.Item>

                {/* Session Description */}
                <Form.Item label="Session Description">
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Session
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

// Style for the form and container
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "-70px",
        height: '100vh',
        backgroundColor: '#bbe4e9',
    },
    form: {
        maxWidth: '500px',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
};

export default AddSession;