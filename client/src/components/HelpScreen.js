import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Collapse } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const faq = [
  {
    title: 'What can I do on this dashboard?',
    text: (
      <>
        Currently, you can view your <Link to="/">ongoing projects</Link>,{' '}
        <Link to="/new/project">start new projects</Link>, download attachments
        and chat with us. We are continuously adding more features!
      </>
    ),
  },
  {
    title:
      'What are all the statuses my project can display, and what do they mean?',
    text: (
      <>
        <b>Open</b> - We have not yet processed this request
        <br />
        <br />
        <b>Waiting for Payment</b> -We are waiting for your payment before
        starting this.
        <br />
        <br />
        <b>In Progress</b> - We are working on this request
        <br />
        <br />
        <b>Waiting on Client</b> - We have stopped working on this because we
        need something from you. Please check this task for more information.
        <br />
        <br />
        <b>Needs Client Approval</b> - We have completed this, and are waiting
        for your approval before marking this as complete.
        <br />
        <br />
        <p>
          Completed tasks are not shown. You may contact us to receive
          information on these. We do not display completed tasks as to not
          distract from ongoing projects
        </p>
      </>
    ),
  },
  {
    title: `I need some more work done. What's the protocol?`,
    text: (
      <>
        Please request new work via the{' '}
        <Link to="/new/project">New Request</Link> tab. Depending on the nature
        of the request and any ongoing projects, you may receive an invoice,
        which must be paid before the work will begin.
      </>
    ),
  },
  {
    title: 'Can I change my username or password?',
    text: (
      <>
        Currently, we do not allow you to change your credentials. We do plan to
        introduce this feature in the future.
      </>
    ),
  },
  {
    title: 'How do I request new features?',
    text: (
      <>
        Our dashboard is very much still in development. Requesting features
        will make it easy for us to provide a better experience for you. Please
        request new features via the <Link to="/new/project">New Request</Link>{' '}
        tab.
      </>
    ),
  },
  {
    title: 'I found a bug! What do I do?',
    text: (
      <>
        Our dashboard is currently in Alpha v.0.1, and as such, you may
        encounter bugs. Please report a bug via the{' '}
        <Link to="/new/project">New Request</Link> tab.
      </>
    ),
  },
];

export default function ConfirmationScreen() {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: 600, paddingTop: '16vh' }}
    >
      <Title level={3}>Help!</Title>
      <Collapse>
        {faq.map((item) => (
          <Panel header={item.title} key={item.title}>
            <p>{item.text}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
