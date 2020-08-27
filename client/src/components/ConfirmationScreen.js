import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from 'antd';

const { Title } = Typography;

export default function ConfirmationScreen() {
  const history = useHistory();

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 600, paddingTop: '16vh' }}
    >
      <Title level={3}>Your request has been processed.</Title>
      <Button
        onClick={() => history.push('/')}
        className="approve-button"
        type="primary"
        size="large"
      >
        Go Back Home
      </Button>
    </div>
  );
}
