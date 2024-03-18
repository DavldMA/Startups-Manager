import { Card, Button, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import '../App.css';
import { favorites, deleteFavorite } from '../services/favoriteService';
import { useEffect, useState } from 'react';

const { Meta } = Card;

interface FavoritoItem {
  id: string;
  nome: string;
}

const Favorito: React.FC = () => {
  const [startupsData, setStartupsData] = useState<FavoritoItem[]>([]);
  const [content, setContent] = useState(<div></div>);
  const [deletionStatus, setDeletionStatus] = useState(false);
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

  useEffect(() => {
    const fetchStartups = async () => {
      const data = await favorites();
      if (data && data.length > 0) {
        const flattenedData = data.flat();
        setStartupsData(flattenedData);
      } else {
        setStartupsData([]);
        setContent(<div>No data available.</div>);
      }
    };

    fetchStartups();
  }, [deletionStatus]);

  const handleDelete = async (id: string) => {
      const result = await deleteFavorite(id);
      if (result) {
        setDeletionStatus(!deletionStatus);
        success("Removed from Favorites with Success")
      }
  };

  const listItems = startupsData.map((d) => (
      <Card style={{ width: "auto", marginTop: 16 }} key={d.id}>
        <Meta title={d.nome} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button style={{border: 'none', boxShadow: 'none'}} icon={<StarFilled />} onClick={() => handleDelete(d.id)} />
        </div>
      </Card>
  ));

  return (
      <>
        {contextHolder}
        {listItems}
        {content}
      </>
  );
};

export default Favorito;