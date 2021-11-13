import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GamesListContainer,
  PageContainer,
  PageHeader,
  GamesContainer,
  LastMoveText,
  PlayerNameText,
  ContentContainer,
  SelectedGameContainer,
  InfoContainer,
  MovesText,
} from './styles';

const API_HTTP_ENDPOINT = 'http://localhost:3030';
const API_WEBSOCKET_ENDPOINT = 'ws://localhost:8080';

const ws = new WebSocket(API_WEBSOCKET_ENDPOINT);

const App = () => {
  const [currentGames, setCurrentGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(0);

  useEffect(() => {
    async function loadGames() {
      const { data } = await axios.get(`${API_HTTP_ENDPOINT}/games`);

      setCurrentGames(data);
    }

    loadGames();
  }, []);

  useEffect(() => {
    ws.onmessage = (event) => {
      if (event.data === 'Websocket Connection Established') {
        console.log(event.data);
        return;
      }

      const updatedGame = JSON.parse(event.data);
      const updatedGameIndex = currentGames.map((game) => game.id).indexOf(updatedGame.id);

      const newCurrentGames = [...currentGames];
      newCurrentGames[updatedGameIndex] = updatedGame;

      setCurrentGames(newCurrentGames);
    };
  }, [currentGames]);

  const renderGames = () => (
    <GamesListContainer>
      {currentGames.map((game, index) => (
        <GamesContainer key={game.id} selected={selectedGame === index} onClick={() => setSelectedGame(index)}>
          <PlayerNameText>Last move:</PlayerNameText>
          <LastMoveText>{game.lastMove}</LastMoveText>
          <PlayerNameText>White pieces: {game.players.white}</PlayerNameText>
          <PlayerNameText>Black pieces: {game.players.black}</PlayerNameText>
        </GamesContainer>
      ))}
    </GamesListContainer>
  );

  const renderSelectedGame = () => (
    <SelectedGameContainer>
      <InfoContainer>
        <PlayerNameText>Last move:</PlayerNameText>
        <LastMoveText>{currentGames[selectedGame].lastMove}</LastMoveText>
        <MovesText>Moves: {currentGames[selectedGame].moves.join(' ')}</MovesText>
        <PlayerNameText>White pieces: {currentGames[selectedGame].players.white}</PlayerNameText>
        <PlayerNameText>Black pieces: {currentGames[selectedGame].players.black}</PlayerNameText>
      </InfoContainer>
    </SelectedGameContainer>
  );

  return (
    <PageContainer className="App">
      <PageHeader>Live Chess Games</PageHeader>
      <ContentContainer>
        {renderGames()}
        {currentGames[selectedGame] ? renderSelectedGame() : null}
      </ContentContainer>
    </PageContainer>
  );
};

export default App;
