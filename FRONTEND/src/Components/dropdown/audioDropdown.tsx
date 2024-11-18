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
  overflow: hidden;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface DropdownProps {
  title: string;
}

const DropdownAudio = ({ title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.2292 21.8751C19.25 21.8751 20.1129 21.5226 20.8177 20.8178C21.5226 20.1129 21.875 19.2501 21.875 18.2292V10.2084H24.7917C25.2049 10.2084 25.5515 10.0684 25.8315 9.78841C26.1115 9.50841 26.251 9.1623 26.25 8.75008C26.249 8.33786 26.109 7.99175 25.83 7.71175C25.551 7.43175 25.2049 7.29175 24.7917 7.29175H21.875C21.4618 7.29175 21.1157 7.43175 20.8367 7.71175C20.5577 7.99175 20.4177 8.33786 20.4167 8.75008V15.3126C20.1007 15.0695 19.7604 14.8872 19.3959 14.7657C19.0313 14.6442 18.6424 14.5834 18.2292 14.5834C17.2084 14.5834 16.3455 14.9358 15.6406 15.6407C14.9358 16.3456 14.5834 17.2084 14.5834 18.2292C14.5834 19.2501 14.9358 20.1129 15.6406 20.8178C16.3455 21.5226 17.2084 21.8751 18.2292 21.8751ZM11.6667 26.2501C10.8646 26.2501 10.1782 25.9647 9.60752 25.394C9.03683 24.8233 8.75099 24.1365 8.75002 23.3334V5.83341C8.75002 5.03133 9.03585 4.34494 9.60752 3.77425C10.1792 3.20355 10.8656 2.91772 11.6667 2.91675H29.1667C29.9688 2.91675 30.6556 3.20258 31.2273 3.77425C31.799 4.34591 32.0843 5.0323 32.0834 5.83341V23.3334C32.0834 24.1355 31.798 24.8224 31.2273 25.394C30.6566 25.9657 29.9697 26.2511 29.1667 26.2501H11.6667ZM11.6667 23.3334H29.1667V5.83341H11.6667V23.3334ZM5.83335 32.0834C5.03127 32.0834 4.34488 31.7981 3.77419 31.2274C3.20349 30.6567 2.91766 29.9698 2.91669 29.1667V10.2084C2.91669 9.79522 3.05669 9.44911 3.33669 9.17008C3.61669 8.89105 3.9628 8.75105 4.37502 8.75008C4.78724 8.74911 5.13384 8.88911 5.41481 9.17008C5.69578 9.45105 5.8353 9.79716 5.83335 10.2084V29.1667H24.7917C25.2049 29.1667 25.5515 29.3067 25.8315 29.5867C26.1115 29.8667 26.251 30.2129 26.25 30.6251C26.249 31.0373 26.109 31.3839 25.83 31.6649C25.551 31.9458 25.2049 32.0854 24.7917 32.0834H5.83335Z" fill="#1E1E1E"/>
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
                <audio controls>
                  <source src="audio-file-1.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CarouselItem>
              <CarouselItem>
                <audio controls>
                  <source src="audio-file-2.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CarouselItem>
              <CarouselItem>
                <audio controls>
                  <source src="audio-file-3.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CarouselItem>
            </Carousel>
          </CarouselWrapper>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownAudio;
