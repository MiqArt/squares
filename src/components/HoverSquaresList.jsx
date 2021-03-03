import React from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import SquaresStore from '../store/SquaresStore';

const HoverSquaresList = observer(() => {
  return (
    <>
    {
      SquaresStore.squares.length > 0 ?
      <ListContainer>
        <Title>Hover squares</Title>
        {
          SquaresStore.squares.map(row => {
            return row.map(({ id, rowIndex, colIndex, hovered }) => (
              hovered ? <ListItem key={id} >row {rowIndex} col {colIndex}</ListItem> : null
            ))
          })
        }
      </ListContainer>
      :
      null
    }
    </>
  );
});

export default HoverSquaresList;

const ListContainer = styled.div`
  margin: 0 10px;
  padding-bottom: 20px;
  height: calc(100vh - 30px);
  overflow-y: auto;
`;

const ListItem = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin: 5px 0;
  padding: 15px 5px;
  border: 2px solid #fbefd6;
  border-radius: 7px;
  color: #896d3a;
  background-color: #fbf8e3;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  line-height: 33px;
  margin-bottom: 15px;
  `;
