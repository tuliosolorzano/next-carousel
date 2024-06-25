import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface IndicatorProps {
  active: boolean;
  onClick: () => void;
}

interface ProgressBarProps {
  active: boolean;
}

interface ControlsContainerProps {
  activeIndex: number;
  totalImages: number;
  onIndicatorClick: (index: number) => void;
  isPlaying: boolean;
  onTogglePlayPause: () => void;
}

const ControlsWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const Indicator = styled.div<IndicatorProps>`
  width: 33px;
  height: 20px;
  background: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IndicatorNumber = styled.span<{ active: boolean }>`
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => (props.active ? '#263640' : '#C4C4C4')};
  margin-left: 5px;
`;

const growHeight = keyframes`
  from {
    height: 3px;
  }
  to {
    height: 14px;
  }
`;

const shrinkHeight = keyframes`
  from {
    height: 14px;
  }
  to {
    height: 3px;
  }
`;

const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 3px;
  background: ${(props) => (props.active ? '#FF9900' : '#263640')};
  border-radius: 10px;
  opacity: ${(props) => (props.active ? '1' : '0.3')};
  animation: ${(props) =>
    props.active
      ? css`
          ${growHeight} 0.5s linear forwards
        `
      : css`
          ${shrinkHeight} 0.5s linear forwards
        `};
`;

const PlayPauseButton = styled.button`
  margin-top: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #d9d9d9;
`;

const ControlsContainer: React.FC<ControlsContainerProps> = ({
  activeIndex,
  totalImages,
  onIndicatorClick,
  isPlaying,
  onTogglePlayPause,
}) => {
  return (
    <ControlsWrapper>
      {Array.from({ length: totalImages }).map((_, index) => (
        <Indicator
          key={index}
          active={index === activeIndex}
          onClick={() => onIndicatorClick(index)}
        >
          <IndicatorNumber active={index === activeIndex}>
            {(index + 1).toString().padStart(2, '0')}
          </IndicatorNumber>
          <ProgressBar active={index === activeIndex} />
        </Indicator>
      ))}
      <PlayPauseButton onClick={onTogglePlayPause}>
        {isPlaying ? '❚❚' : '▶'}
      </PlayPauseButton>
    </ControlsWrapper>
  );
};

export default ControlsContainer;
