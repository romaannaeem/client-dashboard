import React, { useState, useEffect } from 'react';
import { Typography, Table, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import clickupApi from '../api/clickup';
import { MessageTwoTone } from '@ant-design/icons';
import '../App.css';

const { Column } = Table;
const { Title } = Typography;

const Projects = () => {
  const auth = useSelector((state) => state.auth);
  const [projectsList, setProjectsList] = useState([]);
  const projectsArray = [];
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      if (auth) {
        clickupApi
          .get(
            `/list/${auth.clickupListId}/task?statuses%5B%5D=complete&include_closed`
          )
          .then((res) => {
            res.data.tasks.map((task) => {
              let project = {
                name: task.name,
                status: task.status.status,
                key: task.id,
              };

              projectsArray.push(project);
            });
          })
          .then(() => {
            setProjectsList(projectsArray);
          });
      }
    };
    fetchData();
  }, [auth]);

  const renderContent = () => {
    {
      console.log(projectsList);
    }
    console.log('auth', auth);
    if (auth) {
      return (
        <>
          <Title>Your Completed Projects</Title>
          <Table className="active-project-table" dataSource={projectsList}>
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              render={(name, record) => (
                <Link to={`/project/${record.key}`}>{name}</Link>
              )}
            />
            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(status) => {
                if (status === 'Open') return <Tag color="blue">{status}</Tag>;
                else if (status === 'in progress')
                  return <Tag color="purple">{status}</Tag>;
                else if (
                  status === 'waiting on client' ||
                  status === 'needs client approval' ||
                  status === 'waiting for payment'
                )
                  return <Tag color="red">{status}</Tag>;
                else return <Tag color="blue">{status}</Tag>;
              }}
            />
            <Column
              title=""
              render={(item, record) => (
                <>
                  <Link to={`/project/${record.key}`}>
                    <MessageTwoTone /> Chat
                  </Link>
                </>
              )}
            />
          </Table>
          <Button
            onClick={() => history.push('/new/project')}
            className="new-project-button"
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            size="large"
          >
            Make a new Request
          </Button>
        </>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 600, paddingTop: '16vh' }}
    >
      {renderContent()}
    </div>
  );
};

export default Projects;
