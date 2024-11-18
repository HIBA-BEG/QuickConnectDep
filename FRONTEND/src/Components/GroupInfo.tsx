import styled from 'styled-components';
import Dropdown from './dropdown/imageDropdown';
import DropdownVideo from './dropdown/videoDropdown';
import DropdownVocale from './dropdown/vocaleDropdown';
import DropdownAudio from './dropdown/audioDropdown';
import DropdownLinks from './dropdown/linksDropdown';
import UsersGroup from './UsersGroup';

const GroupInfoContainer = styled.div`
  width: 380px;
  background-color: #2C2F33;
  padding: 20px;
  display: flex;
  justify-content: center;  
  flex-direction: column;
`;

const Section = styled.div`
  margin-bottom: 5px;
  height: fit-content;
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
const Section2 = styled.div`
  margin-bottom: 20px;
  height: fit-content;
  padding: 10px;
  background-color: #DBDCFF;
  color: black;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const GroupInfo = () => {
  const users = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Admin' },
    { id: 3, name: 'Charlie', role: 'User' },
    { id: 4, name: 'David', role: 'User' },
    { id: 5, name: 'Eve', role: 'User' },
  ];

  

  return (
    <GroupInfoContainer>
      <Section>
      <h3 className="font-roboto-mono font-bold text-[30px] text-[#132C33]">Group Info</h3>
      <h4 className="font-roboto-mono font-bold text-[20px] text-[#132C33]">Files:</h4>
        <Dropdown title="Image" />
        <DropdownVideo title="Video" />
        <DropdownVocale title="Vocale" />
        <DropdownAudio title="Audio" />
        <DropdownLinks title="Links" />
      </Section>
      
      <Section2>
        <UsersGroup users={users} />
      </Section2>
    </GroupInfoContainer>
  );
};

export default GroupInfo;
