import React from 'react';
import { Layout, Form, Input, Button, Typography } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clientClickup from '../api/clientClickup';
import { clickupClientId } from '../config/keys';

const { Title } = Typography;

export default function NewProjectForm() {
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const onSubmit = (values) => {
    console.log('Success:', values);

    clientClickup
      .post(`/list/${auth.clickupListId}/task`, {
        name: values.request,
        content: values.details,
        assignees: [clickupClientId],
      })
      .then(() => history.push('/'))
      .catch((err) => console.log(err));
  };

  const onSubmitFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderContent = () => {
    console.log('form auth', auth);
    switch (auth) {
      case null:
        return <>Loading...</>;
      case '':
        return <Redirect to="/login" />;
      default:
        return (
          <Layout
            style={{ minHeight: '100vh', padding: '10%' }}
            className="layout"
          >
            <div style={{ textAlign: 'center', paddingBottom: '4%' }}>
              <Title>Make a new request</Title>
              <p>
                Note: Depending on your request and account status, you may be
                invoiced prior to work completion.
              </p>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}></div>
              <Form
                style={{ flex: 2 }}
                name="login"
                initialValues={{ remember: true }}
                onFinish={onSubmit}
                onFinishFailed={onSubmitFailed}
              >
                <Form.Item
                  label="Request"
                  name="request"
                  rules={[
                    {
                      required: true,
                      message: 'Please give your request a title!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Details"
                  name="details"
                  rules={[
                    {
                      required: true,
                      message: 'Please give us details about your request.',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Request
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ flex: 1 }}></div>
            </div>
          </Layout>
        );
    }
  };

  return <>{renderContent()}</>;
}
