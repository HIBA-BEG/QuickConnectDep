import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Api/Auth.service';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { IoMdArrowDropdown } from "react-icons/io";
import { userService, UserStatus } from '../Api/User.service';
import Swal from 'sweetalert2';
import quickConnectLogo from '../assets/QuickConnect-Logo.png'

const SidebarContainer = styled.div`
  width: 100px;
  height: 100vh; 
  background-color: #2C2F33;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  color: #fff;
  
  @media (max-width: 768px) {
    position: fixed;
    width: 60px;
    z-index: 100;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;
  width: 60px;
  height: 60px;
  // background-color: #fff; 
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold; 
  color: #2C2F33; 

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
  &:hover {
    background-color: gray;
  }
`;

const ProfileIcon = styled(Icon)`
   margin-top: auto; 
  padding: 10px 0; 
`

const LogoutButton = styled(Icon)`
  padding: 10px 0; 
`;

const StyledParagraph = styled.p`
  color: #999999;
  font-family: 'Roboto', sans-serif; 
  font-size: 12px; 
  margin: 0; 

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const ProfileDropdown = styled.div`
  position: absolute;
  bottom: 10px;
  left: 100%;
  background-color: #DBDCFF;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 190px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 1000;

  @media (max-width: 768px) {
    left: 60px;
    min-width: 150px;
    font-size: 12px;
  }
`;

const DropdownOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  color: black;
  font-weight: bold;
  border-radius: 4px;
  
  &:hover {
    background-color: #404447;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const StatusDropdown = styled.div`
  position: absolute;
  left: 100%;
  background-color: #DBDCFF;
  border-radius: 5px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 150px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);

  @media (max-width: 768px) {
    min-width: fit-content;
    font-size: 12px;
    padding: 6px 4px;
  }
`;

const StatusOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  color: black;
  border-radius: 4px;
  
  &:hover {
    background-color: #404447;
    color: white;
  }
`;

const StatusDot = styled.div<{ status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => 
    props.status === UserStatus.ONLINE ? '#44b700' :
    props.status === UserStatus.BUSY ? '#ff3333' :
    '#808080'};
`;


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        console.error('No user data found');
        navigate('/');
        return;
      }

      const user = JSON.parse(userData);
      if (!user._id) {
        console.error('Invalid user data');
        localStorage.removeItem('user');
        navigate('/');
        return;
      }

      await logoutUser(user._id);
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStatusMenu(!showStatusMenu);
  };


  const handleStatusChange = async (status: UserStatus) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (!userData._id) return;

      const updatedUser = await userService.updateStatus(userData._id, status);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setShowProfileMenu(false);

      Swal.fire({
        icon: 'success',
        title: 'Status Updated!',
        text: `You changed your status to ${status}`,
        showConfirmButton: false,
        timer: 1500,
        position: 'top-end',
        toast: true
      });

    } catch (error) {
      console.error('Failed to update status:', error);
   
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update status',
        timer: 1500,
        position: 'top-end',
        toast: true
      });
    }
  };

  return (
    <SidebarContainer>
      <Logo>
        <img src={quickConnectLogo} alt="logo" />
      </Logo>
      <div className='flex flex-col m-auto'>
        <Icon onClick={() => navigate('/users')}>
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="50" height="50" fill="url(#pattern0_13_191)" />
            <defs>
              <pattern id="pattern0_13_191" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_13_191" transform="scale(0.0111111)" />
              </pattern>
              <image id="image0_13_191" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCUlEQVR4nO2cMW4TURRFXQXEFmAFWRSwAAjboEjjat4ZAe5nIUCqgMQWKCmQ0380ggbJSCRM5n7jc6RX+/2j6zseF3+zEREREREREREREZG/ZbfbPQReAVdVdQO0U5r6eeaPwMV2u31wL8kZx/FJVX1OH5Z+5tPsZPEkK5mDshdN9q+6SCeo9ThV9XJJ0VfpA9HpVNWHJUXv0wei39kvKTp9mNbzKBpFt3QKTTR5cVYHeal2NIpu6cSZaPKSrA7yAu1o+hpfWFB0S6fQRJMXZ3WQl2pHo+iWTpyJJi/J6iAv0I6mr/GFBUW3dApNNHlxVgd5qXY0im7pxJlo8pKsDvIC7Wj6Gl9YUHRLp9BEkxdndZCXakej6JZOnIkmL8nqIC/Qjqav8YUFRbd0Ck00eXFWB3mpdjSKbunEmWjykqwOTrOjvd2AP4r+vqRo7+tgnfs6LtJfT/qdF4uJnu8Nmu8P6uBQraepqutpms42SzLfiKVsfpM8DMPjzX0wJ3u+rGnupRN9QO6B93NdLJ7kJeEfDjmO4/P0/kcDdxf9Lr37UcHdHjhfgEfp3Y8Kbi/5ZhiG8/Tep5DoZ+mdjxJul+a36X2PFuzlfkSXvbyOaOzlVUS/WeBjBH8vrwP28jpU1ddDsodheLrSCqcB8PrAr4wxvdd/xzRNZ7PsOdlV9Q247PrvRhGRTZQfF8A9VpWxDD0AAAAASUVORK5CYII=" />
            </defs>
          </svg>
          <StyledParagraph>Messages</StyledParagraph>
        </Icon>
        <Icon onClick={() => navigate('/friends')}>
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="50" height="50" fill="url(#pattern0_19_2)" />
            <defs>
              <pattern id="pattern0_19_2" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_19_2" transform="scale(0.0111111)" />
              </pattern>
              <image id="image0_19_2" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEN0lEQVR4nO2cTYgcRRiGW4waIyiaxEMiiEa9iCcDiRDIIZBTQHKKiD83PWgiiCDkMh4CXrJJJivd71s9m4VFEhjQgASPCgrqKhIVFIkQovGSgGCyUZD8lBTbQli7h0z3V9NVPd8D32WXnXneb6truruqJ0kURVEURVEURVEURVGmlPn5+dUk3yC5COAKSTupwvL7fUVyX7/fv6vKEcBrbTs0whjzEIDvJ9lcVtd3zqfM0zUAwMU2HRqN5ICabP8LWjWqSB5t26EWxXRhQysAe8t8syx7tm2Huo1ebLupLA/5ZZnvYDB4uG2Huo1earupLK+lMt+ZmZm723boWqMvVfiuaduhbqN16uBkpo59AYxeW1Kvt/1hWOVQC3cK405lAmisvWkknR4Oh3eW+QKYbduhNu7kPJRmAzidZdnGEef8F9t0aExx1bXXzUstfEAukfzCHaqjRpH7fdsOXqn4r/eSSADwdlmGJDRibvKoZiehEXuTq5qdhEYXmlzW7CQ0utLklc1OQoPkO0nHYAczKYqipGl6P8nnSKYkvyH5G8m/3JUVgK8BvOkulafVpzFpmj7qwtzKCjmAcwCemSYfEUi+WmMLwt8kXzTGPEnyji77NMZaexvJgcANmwsADjQ9hEPzEYPkjPAdsh/m5ubWd8VHBJI7hUPZohZ7vd6q2H1EcG9M8kdPwazbSxKzjxjGmF0eQ1mSvw+Hw9tj9RGDZO45mAWwI1YfMYqTft/BerH6iODmQwDXJhDswxh9xBgMBht8h+JyfR6jjxhZlj0+oWDfxugjfZNmEsFOxegjCoCzvoMBOBKrjxgkD/oOZozZFauPGCSfInndY7A/3fbbWH1EAbDg8TA9FLuPGADe9xjsROw+IvT7/XsB3PAY7AbJ+2L1EcMY84ivUCzKPfQTq48YCwsL9/i87AVwZZytsaH5iELyU48j6L3YfcQguaVY0JQO9SvJdbH7iAJgM4DLgofoZXfvois+opA8KTh6PuiajxjGmK1CV2XX3eHfNR9RSGYCwbKu+ojhTq/cHogGc+FP7qKjqz6ikNxU5xk/LP/Npq77iJLn+dM1gm2eFh9Rxg2WTJlPZ4MxMJ/OBmNgPmL7kmvMia949Hk5JB8Rsix7ieTVcYORvArgBWkfks8D+CcUn8akafoggPkageyKOiaxF9m9Bsnjofg0xi1WAtjvvldIIJQt6lLxmmMvhBZfWvUWgD9C8BHBPeUE4LxgILtinjwPYM+t+hhjdvvc6DiuT2NmZ2fXAvjYVyD+v07lef7AKCe3cBqST2PcfVkAv0wwlC3qTJ7nj1V5kXw3JJ9GFPvbzrTQZFvUz1Wr0O7nkjf7m/o0guRHLTbZFnVyhN/hkHzqNnlbAE22RW0vczTGPOFzX8e4PnUb7XN12Y5Zn1R5AvgsJB9FURRFURRFURRFUZSko/wLqX63ep85GoYAAAAASUVORK5CYII=" />
            </defs>
          </svg>

          <StyledParagraph>Friends</StyledParagraph>
        </Icon>
        <Icon onClick={() => navigate('/channel')}>
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.33333 28.1771L13.5938 22.9167L8.33333 17.6563L3.07292 22.9167L8.33333 28.1771ZM36.4583 27.0833L41.6667 18.75L46.875 27.0833H36.4583ZM25 25C23.2639 25 21.7882 24.3924 20.5729 23.1771C19.3576 21.9618 18.75 20.4861 18.75 18.75C18.75 16.9792 19.3576 15.4951 20.5729 14.2979C21.7882 13.1007 23.2639 12.5014 25 12.5C26.7708 12.5 28.2556 13.0993 29.4542 14.2979C30.6528 15.4965 31.2514 16.9806 31.25 18.75C31.25 20.4861 30.6514 21.9618 29.4542 23.1771C28.2569 24.3924 26.7722 25 25 25ZM25 16.6667C24.4097 16.6667 23.9153 16.8667 23.5167 17.2667C23.1181 17.6667 22.9181 18.1611 22.9167 18.75C22.9153 19.3389 23.1153 19.834 23.5167 20.2354C23.9181 20.6368 24.4125 20.8361 25 20.8333C25.5875 20.8306 26.0826 20.6306 26.4854 20.2333C26.8882 19.8361 27.0875 19.3417 27.0833 18.75C27.0792 18.1583 26.8792 17.6639 26.4833 17.2667C26.0875 16.8694 25.5931 16.6694 25 16.6667ZM0 35.4167V34.2187C0 32.691 0.772917 31.4667 2.31875 30.5458C3.86458 29.625 5.86944 29.1653 8.33333 29.1667C8.78472 29.1667 9.21875 29.1757 9.63542 29.1937C10.0521 29.2118 10.4514 29.2549 10.8333 29.3229C10.3472 30.0174 9.98264 30.7639 9.73958 31.5625C9.49653 32.3611 9.375 33.2118 9.375 34.1146V37.5H2.08333C1.49306 37.5 0.998611 37.3 0.6 36.9C0.201389 36.5 0.00138889 36.0056 0 35.4167ZM12.5 35.4167V34.1146C12.5 31.8576 13.6549 30.0347 15.9646 28.6458C18.2743 27.2569 21.2861 26.5625 25 26.5625C28.75 26.5625 31.7708 27.2569 34.0625 28.6458C36.3542 30.0347 37.5 31.8576 37.5 34.1146V35.4167C37.5 36.0069 37.3 36.5021 36.9 36.9021C36.5 37.3021 36.0056 37.5014 35.4167 37.5H14.5833C13.9931 37.5 13.4986 37.3 13.1 36.9C12.7014 36.5 12.5014 36.0056 12.5 35.4167ZM41.6667 29.1667C44.1667 29.1667 46.1806 29.6271 47.7083 30.5479C49.2361 31.4688 50 32.6924 50 34.2187V35.4167C50 36.0069 49.8 36.5021 49.4 36.9021C49 37.3021 48.5056 37.5014 47.9167 37.5H40.625V34.1146C40.625 33.2118 40.5125 32.3611 40.2875 31.5625C40.0625 30.7639 39.7236 30.0174 39.2708 29.3229C39.6528 29.2535 40.0437 29.2104 40.4437 29.1937C40.8438 29.1771 41.2514 29.1681 41.6667 29.1667ZM25 30.7292C23.0208 30.7292 21.25 30.9896 19.6875 31.5104C18.125 32.0312 17.2049 32.6389 16.9271 33.3333H33.125C32.8125 32.6389 31.8833 32.0312 30.3375 31.5104C28.7917 30.9896 27.0125 30.7292 25 30.7292Z" fill="#B3B3B3" />
          </svg>
          <StyledParagraph>Groups</StyledParagraph>

        </Icon>
        <Icon onClick={() => navigate('/Notifications')}>
          <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.6507 20.8162L27.4231 17.7358V13.6552C27.4194 10.8352 26.3202 8.11669 24.3381 6.02532C22.3561 3.93396 19.6319 2.6183 16.6923 2.33276V0H14.3077V2.33276C11.3681 2.6183 8.64394 3.93396 6.66186 6.02532C4.67978 8.11669 3.58062 10.8352 3.57692 13.6552V17.7358L0.349346 20.8162C0.12573 21.0295 6.75292e-05 21.3189 0 21.6207V25.0345C0 25.3363 0.125618 25.6257 0.349219 25.8391C0.57282 26.0525 0.876088 26.1724 1.19231 26.1724H9.53846V27.3103C9.53846 28.8193 10.1666 30.2665 11.2846 31.3335C12.4026 32.4006 13.9189 33 15.5 33C17.0811 33 18.5974 32.4006 19.7154 31.3335C20.8335 30.2665 21.4615 28.8193 21.4615 27.3103V26.1724H29.8077C30.1239 26.1724 30.4272 26.0525 30.6508 25.8391C30.8744 25.6257 31 25.3363 31 25.0345V21.6207C30.9999 21.3189 30.8743 21.0295 30.6507 20.8162ZM19.0769 27.3103C19.0769 28.2157 18.7001 29.084 18.0293 29.7243C17.3585 30.3645 16.4487 30.7241 15.5 30.7241C14.5513 30.7241 13.6415 30.3645 12.9707 29.7243C12.2999 29.084 11.9231 28.2157 11.9231 27.3103V26.1724H19.0769V27.3103Z" fill="#B3B3B3" />
          </svg>
          <StyledParagraph>Notifications</StyledParagraph>

        </Icon>

      </div>
      <ProfileIcon onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ position: 'relative' }}>
        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="50" height="50" fill="url(#pattern0_19_3)" />
          <defs>
            <pattern id="pattern0_19_3" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_19_3" transform="scale(0.0111111)" />
            </pattern>
            <image id="image0_19_3" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2klEQVR4nO2cz2tcVRTHr40txoVCNVUQf5S0W+lCxNIKEjTYhUttrV0IbQnYRf+EybJUxjQkmfv93pchC38s3lboxpVEbak/scaENoXuCiZtUwrRNuotl3kto42aifPevbn3fOALw8zAzPly5sx95553lRIEQRAEQRAEQRA6J8uyHQCOkfyE5HcArpK8XWjRPVe89h7J/nV8RLrUarUHjTHvkPyKpO1EAL4keTDP8x7fcQQNgNdJXujU4FU0R3LQdzzBQfJhkpNdMPjvGW7q9Xqv7/iCoNFobCP5bbdNbtPXzWazT6VMo2XyXIkm3yslyZrNVrkoM5Pvy+ypqamHVGqwhJq8hpoNlRIkB6s2uU37VCrrZHZnCbdezSaxzgZwyKPJd3VAxQ6AMwEY/YWKvXdB/ya7P8U/jTHbVayg1SCygWhIxQpbnTYbSFZ/pGIFwPcBGf2NihW2esihGP2LihUAt3wb3KbfVKzQv7l/kYoVBmCuGE0xumtAanQ1UFYd1QBZR1cDyY99/wG26UMVK2wNuthAFHWvo991znyb7L6D1vo5FTNcxwRSCZpWsUPyoG+jjTFvqdjJ87ynolmOf9JMEnuGDq31ax6zeUClBADjweiGSo16vd7rpocqNPlskpNKDjcPV1G9niX5uEqZZrPZB+BcmZmc7IDjamXEzcWVUZOTLRf/BslXi5/5/zV4JrnVRafked6jtX7bTRN1crlevHcawP5arbbJdxwbCmPMdtf8cTMYxSz1ots8KDYQFtzIQPHaUPS9C0EQBEEQBEEQhGQg+SiA3caYowBOATjtOnBFO/UKgF+d3GPXF3E3HxXvGSF5xBjz0ujo6CO+4wiO8fHxJ92GLYAmyUtd7NzNu7tzXd8ky7InVIoYY3aRPAngpwqa/ncbTj+SPJFl2fMqZkg+Q/J4cTxP6eb+VxuV5LDWeqeKBZJ7AXwawoTSapkO4DMAb1hrH1AbjTzPt2itD5M879tMrl0/GGPeJblZbQRcdgC4GIBxdp1yBwK8GWyGa61fdLsiARhlu6TPAbygAjsWYhjA7wGYY7usP0iOei8nbvuoOGvOxiwA59yBAb5MfoXkkm8TWJ3Z140xL1dqsvvA4jLYJqZlrfWeSkweGxt7zO1ABxC09aSFLMu2lm40gA8CCNb6FID3Szfa88FTNgQB+LkKo5d9B0r/ulm60QAuBxCo9az5KoweCyBQ61kjpRuttX6K5LUAgrWetDQxMfF06Ua33exzI4CgrYeLloHKJz0BTBSrkBXfJrA8rRQxjk9OTj5bqcmCIAiCIAiCIAiCIAgqTO4AsQnvcdVu+lwAAAAASUVORK5CYII=" />
          </defs>
        </svg>
        <StyledParagraph>Profile</StyledParagraph>

        {showProfileMenu && (
          <ProfileDropdown>
            <DropdownOption onClick={() => navigate('/MyProfile')}>
              View Profile
              <FaArrowRight />
            </DropdownOption>
            <DropdownOption onClick={handleStatusClick} style={{ position: 'relative' }} >
              Change Status
              <IoMdArrowDropdown style={{ fontSize: '24px' }} />
              
              {showStatusMenu && (
                <StatusDropdown>
                  <StatusOption onClick={() => handleStatusChange(UserStatus.ONLINE)}>
                    <StatusDot status={UserStatus.ONLINE} />
                    Online
                  </StatusOption>
                  <StatusOption onClick={() => handleStatusChange(UserStatus.BUSY)}>
                    <StatusDot status={UserStatus.BUSY} />
                    Busy
                  </StatusOption>
                  <StatusOption onClick={() => handleStatusChange(UserStatus.OFFLINE)}>
                    <StatusDot status={UserStatus.OFFLINE} />
                    Offline
                  </StatusOption>
                </StatusDropdown>
              )}
              
            </DropdownOption>
          </ProfileDropdown>
        )}

      </ProfileIcon>
      <LogoutButton onClick={handleLogout}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="40" height="40" fill="url(#pattern0_19_4)" />
          <defs>
            <pattern id="pattern0_19_4" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlinkHref="#image0_19_4" transform="scale(0.0111111)" />
            </pattern>
            <image id="image0_19_4" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACkElEQVR4nO2dzWoUQRRGSxdGIS+gvmGMLuNydgrCEBoH5h4YmP0sXYhPoHER40sIgisdRVy1FDYoQhJ0uure6foO3GU3VYfL1z9V05OSEEIIIYQQQkyBrusOgEfAmZl9Bfp9KPs11jPgeLPZ3EqRWS6X94H33tLYXfpFnksK3Ml7L5nf9S5kZw9x4S2nH7mzH6RoAG8nKPpNigaw9RbD+LVN0QggpS9RKRreQpBof1moo/1FouggRKVoeAtBov1loY72F4migxCVouEtBIn2l4U62l8kig5CVIqGtxAk2l8W6uhpRMd8Pr8DMCzwfgKe5aU9RQfjis6S/z7OzF4Wkd1qR/d9f+Oy1aUisluODjP7ctnxo8tuWTRwetU5RpXdsuiu6w6yzCqyWxadyZttgBfXyH61Xq9vp11oXXQ12d5CCCC6imxvIQQRXVy2txACiS4q21sIwUQXk11z8mb2AzhZrVb3dhERZV7/dOtXWfTj0oId5vU02oB64G5xw5XnZWYfQw0I6GtERu15mdmHUANiotFhZk9CDYjhYphl62I4oUot396xB6L1wEJ50XoEp3xH66US5aNDr0kpn9F68U/5i6GWsqhz12Fmz686hxZn2V30bDa7CXyrIjkz5r0reybazL5Xkdyy6IyZratIzrQserFYHGbZQ2fn7WGn2uTI+KL/3IeXStNyR1fFWwgS7S8LdbS/SBQdhKgUDW8hSLS/LNTR/iJRdBCiUjS8hSDR/rJQR/uLRNFBiErR8BZCQ6Kn+BHYzykaw2fb+4nV6xQNM3sYQEw/ch2laAx7Gy4CyOlHqvOQn57P5D8gmIjs85q/Kvgvhq1Rxznf9uwCuR3GfBS2k4UQQgghhBAiOfETLcyeie4jCkQAAAAASUVORK5CYII=" />
          </defs>
        </svg>
        <StyledParagraph> Log-Out</StyledParagraph>

      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;
