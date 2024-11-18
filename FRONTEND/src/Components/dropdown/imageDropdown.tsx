import { useState } from 'react';
import styled from 'styled-components';

interface DropdownContentProps {
  isOpen: boolean;
}

const DropdownContainer = styled.div`
  margin-top: 20px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

const DropdownContent = styled.div<DropdownContentProps>`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const CarouselWrapper = styled.div`
  overflow: hidden; /* Hides overflow content */
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto; /* Allows horizontal scroll */
  gap: 10px;
  padding: 10px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none; /* Hides scrollbar in Webkit browsers */
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
`;

interface DropdownProps {
  title: string;
}

const Dropdown = ({ title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.1823 20.4167C22.8351 20.4167 24.239 19.8456 25.394 18.7032C26.549 17.5608 27.1868 16.1876 27.3073 14.5834C25.6545 14.5834 24.239 15.1546 23.0606 16.297C21.8823 17.4393 21.2562 18.8126 21.1823 20.4167ZM21.1823 20.4167C21.1094 18.8126 20.4838 17.4393 19.3054 16.297C18.1271 15.1546 16.7111 14.5834 15.0573 14.5834C15.1788 16.1876 15.8171 17.5608 16.9721 18.7032C18.1271 19.8456 19.5305 20.4167 21.1823 20.4167ZM21.1823 16.0417C21.5955 16.0417 21.9421 15.9017 22.2221 15.6217C22.5021 15.3417 22.6416 14.9956 22.6406 14.5834V14.2188L23.0052 14.3647C23.3698 14.5105 23.7407 14.547 24.1179 14.474C24.4952 14.4011 24.7805 14.1945 24.974 13.8542C25.1927 13.4897 25.2656 13.1008 25.1927 12.6876C25.1198 12.2744 24.8768 11.9827 24.4636 11.8126L24.099 11.6667L24.4636 11.5209C24.8768 11.3508 25.114 11.0528 25.1752 10.627C25.2365 10.2011 25.1694 9.81855 24.974 9.47925C24.7552 9.11467 24.4636 8.90223 24.099 8.84196C23.7344 8.78168 23.3698 8.82397 23.0052 8.96883L22.6406 9.11467V8.75008C22.6406 8.33689 22.5006 7.99078 22.2206 7.71175C21.9406 7.43272 21.595 7.29272 21.1838 7.29175C20.7725 7.29078 20.4264 7.43078 20.1454 7.71175C19.8645 7.99272 19.7245 8.33883 19.7254 8.75008V9.11467L19.3609 8.96883C18.9963 8.823 18.6317 8.78022 18.2671 8.8405C17.9025 8.90078 17.6109 9.11369 17.3921 9.47925C17.1977 9.81953 17.1311 10.2026 17.1923 10.6284C17.2536 11.0542 17.4903 11.3517 17.9025 11.5209L18.2671 11.6667L17.9025 11.8126C17.4893 11.9827 17.2463 12.2744 17.1734 12.6876C17.1004 13.1008 17.1734 13.4897 17.3921 13.8542C17.5865 14.1945 17.8724 14.4011 18.2496 14.474C18.6268 14.547 18.9972 14.5105 19.3609 14.3647L19.7254 14.2188V14.5834C19.7254 14.9966 19.8654 15.3432 20.1454 15.6232C20.4254 15.9032 20.7715 16.0427 21.1838 16.0417M21.1838 13.1251C20.7706 13.1251 20.4245 12.9851 20.1454 12.7051C19.8664 12.4251 19.7259 12.079 19.724 11.6667C19.722 11.2545 19.862 10.9084 20.144 10.6284C20.4259 10.3484 20.772 10.2084 21.1823 10.2084C21.5926 10.2084 21.9392 10.3484 22.2221 10.6284C22.505 10.9084 22.6445 11.2545 22.6406 11.6667C22.6368 12.079 22.4968 12.4256 22.2206 12.7065C21.9445 12.9875 21.5984 13.127 21.1823 13.1251M18.7031 27.7084H26.6146L26.8698 29.6407L5.39585 32.2657L2.69794 10.5001L7.29169 9.98966V12.9063L5.97919 13.0886L7.94794 29.0209L18.7031 27.7084ZM10.2084 24.7917V2.91675H32.0834V24.7917H10.2084ZM13.125 21.8751H29.1667V5.83341H13.125V21.8751Z" fill="#1E1E1E"/>
          </svg>
        </span>
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </DropdownHeader>
      <DropdownContent isOpen={isOpen}>
        {isOpen && (
          <CarouselWrapper>
          <Carousel>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
            <CarouselItem>
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </CarouselItem>
          </Carousel>
          </CarouselWrapper>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default Dropdown;
