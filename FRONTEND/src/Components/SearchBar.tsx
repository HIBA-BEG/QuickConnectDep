import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";

import styled from 'styled-components';
import UserSearchPopup from './UserSearchPopup';


const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #DBDCFF;
  padding: 10px;
  border-radius: 15px;
  margin: 10px 0;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;


const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #333;
`;

const Input = styled.input`
  flex: 1;
  padding: 3px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
`;

const Divider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #999;
  margin: 0 10px;
`;

interface SearchBarComponentProps {
    currentUserId: string;
}

const SearchBarComponent: React.FC<SearchBarComponentProps> = ({ currentUserId }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    return (
        <>
            <SearchBar onClick={() => setIsPopupOpen(true)}>
                <IconWrapper>
                    <FiSearch size={25} />
                </IconWrapper>
                <Input
                    type="text"
                    placeholder="Search for New friends"
                    readOnly
                />
                <Divider />
                <IconWrapper>
                    <FaTrashAlt size={18} />
                </IconWrapper>
            </SearchBar>

            {isPopupOpen && (
                <UserSearchPopup
                    onClose={() => setIsPopupOpen(false)}
                    currentUserId={currentUserId}
                />
            )}
        </>
    );
};

export default SearchBarComponent;