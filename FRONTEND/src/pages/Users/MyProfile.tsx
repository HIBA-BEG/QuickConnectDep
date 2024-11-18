import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Sidebar from '../../Components/Sidebar';
import { User, userService } from '../../Api/User.service';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../../profileicon.jpg';


const ProfileContainer = styled.div`
  display: flex;
  height: auto;
  background-color: #2C2F33;
`;

const MainContent = styled.div`
//   display: flex;
  flex: 2;
  background-color: #F9FAFC;
  color: black;
  border-radius: 30px;
  padding: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    margin: 10px;
    padding: 15px;
  }
`;
const Formobile = styled.div`
display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 2;
@media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-left: 60px;
}
`;

const SideContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 20px;

   @media (max-width: 768px) {
    margin: 10px;
  }
`;

const ProfileCard = styled.div`
  background-color: #F9FAFC;
  border-radius: 30px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const RewardsCard = styled.div`
background-color: #DBDCFF;
  border-radius: 30px;
  padding: 20px;
`;

const Header = styled.div`
  font-family: "Roboto Mono", monospace;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
   position: relative;

  & h1{
    font-weight: bold;
    font-size: 48px;
  }

   @media (max-width: 768px) {
    & h1 {
      font-size: 24px;
    }
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  & *:first-child, & *:last-child{
    grid-column: 1 / -1;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  & label{
    font-weight: bold;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  width: 100%;
  background-color: ${props => props.readOnly ? '#DBDCFF' : '#E8E9FF'};
  
  &:focus {
    outline: ${props => props.readOnly ? 'none' : '2px solid #7289DA'};
  }

  @media (max-width: 768px) {
    padding: 12px 8px;
  }
`;

const CommentsSection = styled.div`
  background-color: #DBDCFF;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  padding: 8px;
  background-color: white;
  border-radius: 5px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

 @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const UploadButton = styled.button`
  display: inline-block;
  background-color: #7289DA;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  
  &:hover {
    background-color: #5B73C7;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  text-align: center;

   @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    
    div {
      padding: 10px;
      background-color: #DBDCFF;
      border-radius: 10px;
    }
  }
`;

const OptionsButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all ease-out;
`;

const OptionsMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  width: 80px;
  height: 32px;
  border-radius: 6px;
  background-color: #efefef;
  top: 40px;
  right: 0;
`;

const MenuButton = styled.div`
  cursor: pointer;
`;


const UpdateButton = styled.button`
  width: 112px;
  height: 40px;
  background-color: #22c55e;
  border-radius: 6px;
  color: white;
  font-weight: 500;

  @media (max-width: 768px) {
    width: 100%;
    height: 48px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: ''
    });


    const [comments, setComments] = useState([
        { id: 1, user: 'Hiba', avatar: '/path/to/avatar.jpg', text: "Let's GOooo!!!!", timestamp: '21 20 Nov 2024 9:20 AM' },
        // Add more comments as needed
    ]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user') || '{}');

                const userData = await userService.getUserById(user._id);
                setUserData(userData);
                setFormData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    username: userData.username,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber
                });

                // const friends = await userService.getUserFriends(user._id);

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error instanceof Error ? error.message : 'Failed to fetch user data'
                });
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [])

    const toggleOptions = () => {
        setOptions(!options);
        if (options) {
            setIsEditable(false);
        }
    };

    const toggleEdit = () => {
        setIsEditable(!isEditable);
        setOptions(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData?._id) return;

        try {
            const updatedUser = await userService.updateUser(userData._id, formData);
            setUserData(updatedUser);
            setIsEditable(false);

            await Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Profile updated successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.error('Error updating profile:', err);
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile'
            });
        }
    };

    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#7678ED',
                cancelButtonColor: '#DBDCFF',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed && userData?._id) {
                await userService.deleteUser(userData._id);
                await Swal.fire(
                    'Deleted!',
                    'Your profile has been deleted.',
                    'success'
                );

                navigate('/');
            }
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete profile'
            });
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !userData?._id) return;

        try {
            const updatedUser = await userService.uploadProfilePicture(userData._id, file);
            setUserData(updatedUser);

            Swal.fire({
                icon: 'success',
                title: 'Profile picture updated!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Upload failed',
                text: 'Could not upload profile picture'
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <ProfileContainer>
                <Sidebar />
                <Formobile>

                    <MainContent>

                        <UserInfo>
                            <Header>
                                <h1>Hey, {userData?.lastName.toUpperCase()}  {userData?.firstName.toUpperCase()}</h1>
                                <div className="relative">
                                    <OptionsButton onClick={toggleOptions}>
                                        {options ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 384 512">
                                                <path fill="#B3B3B3" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-8 h-8 text-[#B3B3B3]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                                            </svg>
                                        )}
                                    </OptionsButton>
                                    {options && (
                                        <OptionsMenu>
                                            <MenuButton onClick={toggleEdit}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
                                                    <path fill="#00ff04" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                                                </svg>
                                            </MenuButton>
                                            <MenuButton onClick={handleDelete}>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512">
                                                    <path fill="#ff0000" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                </svg>
                                            </MenuButton>
                                        </OptionsMenu>
                                    )}
                                </div>
                            </Header>
                            <form onSubmit={handleUpdate}>
                                <InputGroup>
                                    <label>First Name:</label>
                                    <Input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        readOnly={!isEditable}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label>Last Name:</label>
                                    <Input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        readOnly={!isEditable}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label>User Name:</label>
                                    <Input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        readOnly={!isEditable}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label>Email:</label>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        readOnly={!isEditable}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label>Phone Number:</label>
                                    <Input
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        readOnly={!isEditable}
                                    />
                                </InputGroup>
                                {isEditable && (
                                    <ButtonContainer>
                                        <UpdateButton type='submit'>
                                            Update
                                        </UpdateButton>
                                    </ButtonContainer>
                                )}
                            </form>

                        </UserInfo>

                        {/* <CommentsSection>
                    <h2>All Comments</h2>
                    {comments.map(comment => (
                        <Comment key={comment.id}>
                            <Avatar src={comment.avatar} alt={comment.user} />
                            <div>
                                <strong>{comment.user}</strong>
                                <p>{comment.text}</p>
                                <small>{comment.timestamp}</small>
                            </div>
                        </Comment>
                    ))}
                </CommentsSection> */}
                    </MainContent>

                    <SideContent>
                        <ProfileCard>
                            <ProfileImage>
                                <img src={userData?.profilePicture || defaultProfileIcon} alt="Profile" />
                            </ProfileImage>
                            <UploadButton as="label" htmlFor="profilePicture">
                                Upload Image
                                <input
                                    type="file"
                                    id="profilePicture"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </UploadButton>
                            <Stats>
                                <div>
                                    <h3>200</h3>
                                    <p>Positive Feedback</p>
                                </div>
                                <div>
                                    <h3>230</h3>
                                    <p>Comments</p>
                                </div>
                            </Stats>
                        </ProfileCard>

                        <RewardsCard>
                            <h2>Rewards</h2>
                            <div>
                                <p>⭐ 230 You can Pin messages</p>
                                <p>⭐ 100 You can delete messages of someone else</p>
                            </div>
                        </RewardsCard>
                    </SideContent>
                </Formobile>

            </ProfileContainer>
        </>

    );
};

export default Profile;