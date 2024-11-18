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

const DropdownVideo = ({ title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.5573 15.4949C25.8976 15.2761 26.0677 14.9723 26.0677 14.5834C26.0677 14.1945 25.8976 13.8907 25.5573 13.672L18.4479 9.11466C18.0834 8.87161 17.7125 8.85314 17.3352 9.05925C16.958 9.26536 16.7699 9.58765 16.7709 10.0261V19.1407C16.7709 19.5782 16.9595 19.9005 17.3367 20.1076C17.7139 20.3147 18.0843 20.2962 18.4479 20.0522L25.5573 15.4949ZM11.6667 26.2501C10.8646 26.2501 10.1782 25.9647 9.60752 25.394C9.03683 24.8233 8.75099 24.1365 8.75002 23.3334V5.83341C8.75002 5.03133 9.03585 4.34494 9.60752 3.77425C10.1792 3.20355 10.8656 2.91772 11.6667 2.91675H29.1667C29.9688 2.91675 30.6556 3.20258 31.2273 3.77425C31.799 4.34591 32.0843 5.0323 32.0834 5.83341V23.3334C32.0834 24.1355 31.798 24.8224 31.2273 25.394C30.6566 25.9657 29.9697 26.2511 29.1667 26.2501H11.6667ZM5.83335 32.0834C5.03127 32.0834 4.34488 31.7981 3.77419 31.2274C3.20349 30.6567 2.91766 29.9698 2.91669 29.1667V10.2084C2.91669 9.79522 3.05669 9.44911 3.33669 9.17008C3.61669 8.89105 3.9628 8.75105 4.37502 8.75008C4.78724 8.74911 5.13384 8.88911 5.41481 9.17008C5.69578 9.45105 5.8353 9.79716 5.83335 10.2084V29.1667H24.7917C25.2049 29.1667 25.5515 29.3067 25.8315 29.5867C26.1115 29.8667 26.251 30.2129 26.25 30.6251C26.249 31.0373 26.109 31.3839 25.83 31.6649C25.551 31.9458 25.2049 32.0854 24.7917 32.0834H5.83335Z" fill="#1E1E1E"/>
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
          </Carousel>
          </CarouselWrapper>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownVideo;
