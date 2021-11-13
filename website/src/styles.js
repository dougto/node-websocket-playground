import styled from 'styled-components';

export const PageContainer = styled.div`
  background-color: #3b3b3b;
  width: 100vw;
  height: 100vh;
  margin: -8px 0 0 -8px;
  padding: 48px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const PageHeader = styled.header`
  color: #fff;
  font-size: 48px;
`;

export const GamesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 20px 20px 20px;
  max-width: 300px;
`;

export const GamesContainer = styled.div`
  padding: 10px;
  background-color: ${props => props.selected ? '#6c6c6c' : '#4b4b4b'};
  margin-bottom: 20px;

  &:hover {
    background-color: #6c6c6c;
    cursor: pointer;
  }
`;

export const HorizontalLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: #6b6b6b;
  margin-bottom: 20px;
`;

export const LastMoveText = styled.h1`
  color: #fff;
  font-size: 60px;
  margin: 10px 0 20px 0;
`;

export const PlayerNameText = styled.h4`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

export const SelectedGameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  flex-direction: column;
`;

export const MovesText = styled.h4`
  color: #fff;
  font-size: 18px;
  font-weight: 400;
`;
