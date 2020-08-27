import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Typography,
  Row,
  Col,
  Comment,
  Input,
  Form,
  Avatar,
  Button,
} from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import clickupApi from '../api/clickup';
import clientClickupApi from '../api/clientClickup';
import { clickupClientId } from '../config/keys';

const { Title } = Typography;

export default function ProjectDetails() {
  const auth = useSelector((state) => state.auth);
  const params = useParams();
  const history = useHistory();
  const [project, setProject] = useState();
  const [comments, setComments] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const response = await clickupApi.get(`/task/${params.id}`);
      const commentResponse = await clickupApi.get(
        `/task/${params.id}/comment`
      );
      setProject(response.data);
      setComments(commentResponse.data.comments);
    };
    fetchData();
    setInterval(fetchData, 45000);
  }, [auth]);

  const completeTask = () => {
    clientClickupApi
      .post(`/task/${project.id}/tag/approved by client`, {
        status: 'complete',
      })
      .then(() => {
        clientClickupApi.put(`/task/${project.id}`, {
          status: 'complete',
        });
      })
      .then(() => history.push('/confirmation'))
      .catch((err) => console.log(err));
  };

  const renderContent = () => {
    if (project) {
      console.log(project);
      return (
        <>
          <Row>
            <Col
              lg={16}
              sm={24}
              xs={24}
              style={{
                padding: 24,
                backgroundColor: '#fff',
                paddingTop: '16vh',
              }}
            >
              <Title>{project.name}</Title>
              <p className="project-description">{project.text_content}</p>
              {project.attachments.length === 0 ? null : (
                <Title level={3} style={{ paddingTop: '4%' }}>
                  Attachments
                </Title>
              )}

              {project.attachments.map((attachment) => {
                return (
                  <a key={attachment.id} href={attachment.url}>
                    <div className="attachment">
                      <PaperClipOutlined />{' '}
                      <span className="attachment-name">
                        {attachment.title}
                      </span>
                    </div>
                  </a>
                );
              })}

              {project.status.status === 'needs client approval' ? (
                <div style={{ paddingTop: '4%' }}>
                  <Title level={3}>Approve Project</Title>
                  <Button
                    onClick={() => completeTask()}
                    className="approve-button"
                    type="primary"
                    size="large"
                  >
                    Approve & Close Project
                  </Button>
                </div>
              ) : null}
            </Col>
            <Col
              lg={8}
              sm={24}
              xs={24}
              style={{
                padding: 24,
                backgroundColor: '#eee',
                paddingTop: '16vh',
                minHeight: '100vh',
                height: '100vh',
                overflowY: 'auto',
              }}
            >
              <Title level={3}>Chat</Title>

              {comments.map((comment) => {
                let author;
                let avatarUrl;
                if (comment.user.id == clickupClientId) {
                  author = 'You';
                  avatarUrl =
                    'https://i0.wp.com/tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png?ssl=1';
                } else {
                  author = comment.user.username;
                  avatarUrl =
                    'https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png';
                }

                let commentDate = new Date(parseInt(comment.date, 10));

                return (
                  <Comment
                    key={comment.id}
                    author={author}
                    datetime={`${commentDate.getDate()} / ${commentDate.getMonth()} / ${commentDate.getFullYear()} ${commentDate.getHours()}:${commentDate.getMinutes()}`}
                    content={<pre>{comment.comment_text}</pre>}
                    avatar={<Avatar alt="Avatar" src={avatarUrl} />}
                  />
                );
              })}

              <Form
                size="large"
                form={form}
                name="comment"
                onFinish={(value) => {
                  let newComment = {
                    comment_text: value.comment,
                    user: { id: clickupClientId },
                    id: value.comment,
                    date: Date.now(),
                  };

                  clientClickupApi
                    .post(`/task/${params.id}/comment`, {
                      comment_text: value.comment,
                    })
                    .then(() => {
                      setComments((oldArray) => [newComment, ...oldArray]);
                    });

                  form.resetFields();
                }}
              >
                <Form.Item name="comment">
                  <Input placeholder="Enter your message..." />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      );
    } else return <>Loading...</>;
  };

  return (
    <div className="site-layout-background" style={{ minHeight: 600 }}>
      {renderContent()}
    </div>
  );
}
