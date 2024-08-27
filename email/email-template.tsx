import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  verifyCode : string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  verifyCode
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>click on the link below to verify</p>
    <a className='' href={`http://localhost:3000/verify/${verifyCode}`}>Click to verify</a>
  </div>
);
