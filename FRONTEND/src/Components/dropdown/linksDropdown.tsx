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

const DropdownLinks = ({ title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggleDropdown}>
        <span>
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2084 24.7916C8.19099 24.7916 6.47162 24.0804 5.05023 22.658C3.62884 21.2357 2.91766 19.5163 2.91669 17.4999C2.91572 15.4835 3.6269 13.7642 5.05023 12.3418C6.47356 10.9194 8.19294 10.2083 10.2084 10.2083H14.5834C14.9965 10.2083 15.3431 10.3483 15.6231 10.6283C15.9031 10.9083 16.0427 11.2544 16.0417 11.6666C16.0407 12.0788 15.9007 12.4254 15.6217 12.7064C15.3427 12.9873 14.9965 13.1269 14.5834 13.1249H10.2084C8.99308 13.1249 7.96009 13.5503 7.1094 14.401C6.2587 15.2517 5.83335 16.2846 5.83335 17.4999C5.83335 18.7152 6.2587 19.7482 7.1094 20.5989C7.96009 21.4496 8.99308 21.8749 10.2084 21.8749H14.5834C14.9965 21.8749 15.3431 22.0149 15.6231 22.2949C15.9031 22.5749 16.0427 22.921 16.0417 23.3333C16.0407 23.7455 15.9007 24.0921 15.6217 24.373C15.3427 24.654 14.9965 24.7935 14.5834 24.7916H10.2084ZM13.125 18.9583C12.7118 18.9583 12.3657 18.8183 12.0867 18.5383C11.8077 18.2583 11.6677 17.9121 11.6667 17.4999C11.6657 17.0877 11.8057 16.7416 12.0867 16.4616C12.3677 16.1816 12.7138 16.0416 13.125 16.0416H21.875C22.2882 16.0416 22.6348 16.1816 22.9148 16.4616C23.1948 16.7416 23.3343 17.0877 23.3334 17.4999C23.3324 17.9121 23.1924 18.2587 22.9134 18.5397C22.6343 18.8207 22.2882 18.9602 21.875 18.9583H13.125ZM20.4167 24.7916C20.0035 24.7916 19.6574 24.6516 19.3784 24.3716C19.0993 24.0916 18.9593 23.7455 18.9584 23.3333C18.9574 22.921 19.0974 22.5749 19.3784 22.2949C19.6593 22.0149 20.0054 21.8749 20.4167 21.8749H24.7917C26.007 21.8749 27.0399 21.4496 27.8906 20.5989C28.7413 19.7482 29.1667 18.7152 29.1667 17.4999C29.1667 16.2846 28.7413 15.2517 27.8906 14.401C27.0399 13.5503 26.007 13.1249 24.7917 13.1249H20.4167C20.0035 13.1249 19.6574 12.9849 19.3784 12.7049C19.0993 12.4249 18.9593 12.0788 18.9584 11.6666C18.9574 11.2544 19.0974 10.9083 19.3784 10.6283C19.6593 10.3483 20.0054 10.2083 20.4167 10.2083H24.7917C26.809 10.2083 28.5289 10.9194 29.9513 12.3418C31.3736 13.7642 32.0843 15.4835 32.0834 17.4999C32.0824 19.5163 31.3712 21.2362 29.9498 22.6595C28.5284 24.0828 26.809 24.7935 24.7917 24.7916H20.4167Z" fill="#1E1E1E"/>
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
                <a href="https://example.com/page1" target="_blank" rel="noopener noreferrer">Link 1</a>
              </CarouselItem>
              <CarouselItem>
                <a href="https://example.com/page2" target="_blank" rel="noopener noreferrer">Link 2</a>
              </CarouselItem>
              <CarouselItem>
                <a href="https://example.com/page3" target="_blank" rel="noopener noreferrer">Link 3</a>
              </CarouselItem>
            </Carousel>
          </CarouselWrapper>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownLinks;
