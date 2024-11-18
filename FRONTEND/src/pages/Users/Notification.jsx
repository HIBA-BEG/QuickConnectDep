import styled from 'styled-components';
import Sidebar from '../../Components/Sidebar';
import NotificationPage from '../../Components/notification/NotificationDash';

const NotificationContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #2C2F33;
`;

const Notification = () => {
    
  return (
    <NotificationContainer>
      <Sidebar />
      <NotificationPage/>
    </NotificationContainer>
  );
};

export default Notification;
