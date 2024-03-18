import 'antd/dist/reset.css';
import { Divider, Space, Typography } from 'antd';
import '../App.css';
import React from "react";
import { useUser } from '../context/userContext';
const { Title, Paragraph, Text, Link } = Typography;




const Home: React.FC = () => {
  const { isLoggedIn } = useUser();


  return (<div className="Home">
    <Typography>
      <Title style={{ marginLeft: 60 }}>Welcome to Startup Directory!</Title>
      <Divider />
      <Paragraph>
        <Space style={{ fontSize: '20px', marginLeft: 60, marginRight: 60, marginTop: 40, fontWeight: '600' }}>
          <span style={{ fontSize: '80px', color: '#fb6161', fontWeight: 'bold' }} >S</span>tartup Directory is a dynamic platform designed to streamline your startup exploration journey. Whether you're an aspiring entrepreneur seeking inspiration or an established business looking for potential collaborations, Startup Directory has got you covered.
        </Space>
      </Paragraph>
      <Paragraph>
        <Text strong >
          {isLoggedIn ? <p style={{ fontSize: '30px', marginLeft: 90 }}>Check our Startups!!</p> : <p style={{ fontSize: '30px', marginLeft: 90, marginTop: 50 }}>Please <Link style={{ fontSize: '30px', color: '#fb6161', textDecoration: 'underline' }} href="/login">login!</Link></p>}
        </Text>
      </Paragraph>
      <Divider />
    </Typography>
  </div>);
}

export default Home;