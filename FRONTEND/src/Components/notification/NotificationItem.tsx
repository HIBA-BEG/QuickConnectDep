import React from 'react';
import styled from 'styled-components';
import { TbClockHour5 } from "react-icons/tb";

interface NotificationProps {
  sender: string;
  type: string;
  message: string;
  timestamp: string;
  onAccept?: () => void;
  onReject?: () => void;
}

const NotificationCard = styled.div`
  display: flex;
  padding: 15px;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
    margin-bottom: 8px;
    
  }
`;

const Badge = styled.span<{ type: string }>`
  align-self: flex-start;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  color: white;
  background-color: ${({ type }) =>
    type === 'Friend Request' ? '#7E3A7D' :
    (type === 'Message' || type === 'Invitation') ? '#7678ED' : 
    '#333'};
`;

const Message = styled.p` 
  font-size: 14px;
  color: #333;
  margin: 10px 0;
`;

const Timestamp = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #888;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button<{ color: string }>`
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: ${({ color }) => color};
  &:hover {
    opacity: 0.9;
  }
    
`;

const NotificationItem: React.FC<NotificationProps> = ({ type,sender, message, timestamp, onAccept, onReject }) => {
  return (
    <NotificationCard>
      <div className='flex flex-col'>
        <Badge type={type}>{type}</Badge>
        <Message><strong>{sender}</strong> {message}</Message>
        <Timestamp><TbClockHour5 />{timestamp}</Timestamp>
      </div>

      {/* Conditionally render buttons only if the type is not 'Message' */}
      {type !== 'Message' && (
        <Actions>
          <Button color="#28a745"  onClick={onAccept}>Accept</Button>
          <Button color="#dc3545" onClick={onReject}>Refuse</Button>
        </Actions>
      )}
    </NotificationCard>
  );
};

export default NotificationItem;
