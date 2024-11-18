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

const DropdownVocale = ({ title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_29_31)">
              <path d="M11.6667 35.0001C11.2535 35.0001 10.9074 34.8601 10.6283 34.5801C10.3493 34.3001 10.2093 33.954 10.2083 33.5417C10.2074 33.1295 10.3474 32.7834 10.6283 32.5034C10.9093 32.2234 11.2554 32.0834 11.6667 32.0834C12.0779 32.0834 12.4245 32.2234 12.7065 32.5034C12.9884 32.7834 13.1279 33.1295 13.125 33.5417C13.1221 33.954 12.9821 34.3006 12.705 34.5815C12.4279 34.8625 12.0818 35.002 11.6667 35.0001ZM17.5 35.0001C17.0868 35.0001 16.7407 34.8601 16.4617 34.5801C16.1826 34.3001 16.0426 33.954 16.0417 33.5417C16.0407 33.1295 16.1807 32.7834 16.4617 32.5034C16.7426 32.2234 17.0888 32.0834 17.5 32.0834C17.9113 32.0834 18.2579 32.2234 18.5398 32.5034C18.8217 32.7834 18.9613 33.1295 18.9583 33.5417C18.9554 33.954 18.8154 34.3006 18.5383 34.5815C18.2613 34.8625 17.9151 35.002 17.5 35.0001ZM23.3333 35.0001C22.9201 35.0001 22.574 34.8601 22.295 34.5801C22.016 34.3001 21.876 33.954 21.875 33.5417C21.874 33.1295 22.014 32.7834 22.295 32.5034C22.576 32.2234 22.9221 32.0834 23.3333 32.0834C23.7446 32.0834 24.0912 32.2234 24.3731 32.5034C24.6551 32.7834 24.7946 33.1295 24.7917 33.5417C24.7888 33.954 24.6488 34.3006 24.3717 34.5815C24.0946 34.8625 23.7485 35.002 23.3333 35.0001ZM17.5 20.4167C16.2847 20.4167 15.2517 19.9914 14.4011 19.1407C13.5504 18.29 13.125 17.257 13.125 16.0417V7.29175C13.125 6.07647 13.5504 5.04348 14.4011 4.19279C15.2517 3.3421 16.2847 2.91675 17.5 2.91675C18.7153 2.91675 19.7483 3.3421 20.599 4.19279C21.4497 5.04348 21.875 6.07647 21.875 7.29175V16.0417C21.875 17.257 21.4497 18.29 20.599 19.1407C19.7483 19.9914 18.7153 20.4167 17.5 20.4167ZM16.0417 29.1667V26.1042C13.8056 25.8126 11.8917 24.8768 10.3002 23.297C8.70869 21.7171 7.7423 19.797 7.40105 17.5365C7.35244 17.1233 7.46181 16.7709 7.72918 16.4792C7.99654 16.1876 8.33681 16.0417 8.75001 16.0417C9.1632 16.0417 9.5098 16.1817 9.7898 16.4617C10.0698 16.7417 10.2579 17.0879 10.3542 17.5001C10.6945 19.2015 11.5393 20.599 12.8888 21.6928C14.2382 22.7865 15.7753 23.3334 17.5 23.3334C19.25 23.3334 20.7934 22.7807 22.1302 21.6753C23.467 20.5699 24.3056 19.1781 24.6458 17.5001C24.7431 17.0869 24.9317 16.7408 25.2117 16.4617C25.4917 16.1827 25.8378 16.0427 26.25 16.0417C26.6622 16.0408 27.0025 16.1866 27.2708 16.4792C27.5392 16.7719 27.6486 17.1243 27.599 17.5365C27.2587 19.7483 26.2986 21.6563 24.7188 23.2605C23.1389 24.8647 21.2188 25.8126 18.9583 26.1042V29.1667C18.9583 29.5799 18.8183 29.9265 18.5383 30.2065C18.2583 30.4865 17.9122 30.6261 17.5 30.6251C17.0878 30.6241 16.7417 30.4841 16.4617 30.2051C16.1817 29.9261 16.0417 29.5799 16.0417 29.1667ZM17.5 17.5001C17.9132 17.5001 18.2598 17.3601 18.5398 17.0801C18.8198 16.8001 18.9593 16.454 18.9583 16.0417V7.29175C18.9583 6.87855 18.8183 6.53244 18.5383 6.25341C18.2583 5.97439 17.9122 5.83439 17.5 5.83341C17.0878 5.83244 16.7417 5.97244 16.4617 6.25341C16.1817 6.53439 16.0417 6.8805 16.0417 7.29175V16.0417C16.0417 16.4549 16.1817 16.8015 16.4617 17.0815C16.7417 17.3615 17.0878 17.5011 17.5 17.5001Z" fill="#1E1E1E"/>
            </g>
            <defs>
            <clipPath id="clip0_29_31">
                <rect width="35" height="35" fill="white"/>
            </clipPath>
            </defs>
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

export default DropdownVocale;
