import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import {  Button, Card, message } from 'antd';
import '../App.css';
import { deleteStartup, startups } from '../services/startupService';
import { DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { isAdmin } from '../services/userAuthService';
import { addFavorite } from '../services/favoriteService';
import StartupForms from '../components/startupCreateForms'
import StartupEditForms from '../components/startupEditForms';

const { Meta } = Card;

interface StartupItem {
  id: string;
  nome: string;
}

const Startup: React.FC = () => {
  const [startupsData, setStartupsData] = useState<StartupItem[]>([]);
  const [admin, setIsAdmin] = useState(false);
  const [content, setContent] = useState(<div></div>);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  const error = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
    });
  };

  const handleDelete = async (id: string) => {
      const result = await deleteStartup(id);
      if (result) {
        setFetchTrigger(!fetchTrigger);
        success("Deleted Startup Succesfully")
      }
  };

  const handleAddFavorite = async(id: string | number) => {
    await addFavorite(id);
    success("Added Startup to the Favorites Succesfully")
  }

  useEffect(() => {
    const fetchStartups = async () => {
        const data = await startups();
        const isAdminData = await isAdmin();
        if (data && data.length > 0) {
            const flattenedData = data.flat();
            setStartupsData(flattenedData);
            setContent(<div></div>);
        } else {
            setStartupsData([]);
            setContent(<div>No data available.</div>);
        }
        setIsAdmin(isAdminData);
    };

    fetchStartups();
}, [fetchTrigger]); 


  const listItems = startupsData.map((d) => (
      <Card style={{ width: "auto", marginTop: 16 }} key={d.id}>
        <Meta title={d.nome} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button style={{border: 'none', boxShadow: 'none'}} icon={<StarOutlined />} onClick={() => handleAddFavorite(d.id)} />
          <StartupEditForms setFetchTrigger={setFetchTrigger} id={d.id}></StartupEditForms>
          <Button style={{border: 'none', boxShadow: 'none'}} icon={<DeleteOutlined />} onClick={() => handleDelete(d.id)} />
        </div>
      </Card>
  ));

  return (
      <>
        {contextHolder}
        {admin && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <StartupForms setFetchTrigger={setFetchTrigger} />
            </div>
          </div>)}
        {listItems}
        {content}
        
      </>
  );
};

export default Startup;
