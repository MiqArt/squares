import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { baseUrl } from '../api/baseUrl';
import { observer } from 'mobx-react-lite';
import SquaresStore from '../store/SquaresStore';

const Game = observer(() => {
  const [difficulties, setDifficulties] = useState({});
  const [selectValue, setSelectValue] = useState("");
  const [error, setError] = useState(false); // for validation of select

  const getDifficulties = async () => {
    try {
      const res = await fetch(baseUrl);
      const resJson = await res.json();
      setDifficulties(resJson);
    } catch (error) {
      console.log(error);
    };
  };

  const createGameMatrix = (num) => {
    let countFromOne = 1;
    const rows = new Array(num).fill(0);

    const matrix = rows.map((row, rowIndex) => {
      return new Array(num).fill(0).map((col, colIndex) => {
        return {
          id: countFromOne++,
          rowIndex: rowIndex + 1,
          colIndex: colIndex + 1,
          hovered: false
        }
      })
    });

    SquaresStore.setSquares(matrix);
  };

  const onHandleSelectChange = (e) => {
    const { value } = e.target;
    setSelectValue(value);
    setError(false);
  };

  const onHandleHover = useCallback((arrayRowIndex, arrayColIndex) => {
    SquaresStore.updateSquares(arrayRowIndex, arrayColIndex)
  }, []);

  const startGame = () => {
    selectValue ? createGameMatrix(JSON.parse(selectValue)) : setError(true);
  }

  useEffect(() => {
    getDifficulties();
  }, []);

  return (
    <GameContainer>
      <GameHeader>
        <CustomSelect
          value={selectValue}
          onChange={onHandleSelectChange}
          error={error}
          disabled={!Object.keys(difficulties).length > 0}
        >
          <option value="" hidden>
            Pick mode
          </option>
          {
            Object.keys(difficulties).map((key, index) => (
              <option key={key + index} value={difficulties[key].field}>{`${key} - ${difficulties[key].field} fields`}</option>
            ))
          }
        </CustomSelect>
        <ButtonStart onClick={startGame}>START</ButtonStart>
        <ErrorText error={error}>Choose mode!</ErrorText>
      </GameHeader>
      <GameBody setBorder={SquaresStore.squares.length > 0}>
        {
          SquaresStore.squares.map((row, arrayRowIndex) => {
            return (
              <SquaresRow key={`row-${arrayRowIndex}`}>
                {
                  row.map(({ id, hovered }, arrayColIndex) => (
                    <Square
                      key={id}
                      onMouseEnter={() => onHandleHover(arrayRowIndex, arrayColIndex)}
                      hovered={hovered}
                    />
                  ))
                }
              </SquaresRow>
            )
          })
        }
      </GameBody>
    </GameContainer>
  )
});

export default Game;

const GameContainer = styled.div`
  display: block;
  margin: 0 10px;
`;

const GameHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const GameBody = styled.div`
  min-width: 250px;
  border: ${({ setBorder }) => setBorder ? '1px solid black' : 'none'};
`;

const SquaresRow = styled.div`
  display: flex;
`;

const Square = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  background-color: ${(props) => props.hovered ? '#03a8f4' : 'transparent'};
`;

const CustomSelect = styled.select`
  font-family: 'Roboto', sans-serif;
  /* font-weight: 500; */
  position: relative;
  width: 68%;
  height: 30px;
  outline: none;
  cursor: pointer;
  border-color: ${({ error }) => error ? 'red' : '#1f1f1f'};
  padding: 0 8px;
  -moz-appearance: none; 
  -webkit-appearance: none;
  appearance:none;

  // for custom arrow icon
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 2px;

  /* & option {
    font-weight: 500;
  } */
`;

const ButtonStart = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 15px;
  width: 30%;
  height: 30px;
  border: none;
  border-radius: 7px;
  color: #fff;
  background-color: rgb(0, 117, 216);
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgb(0, 98, 184);
  }
`;

const ErrorText = styled.span`
  font-family: 'Roboto',sans-serif;
  font-size: 11px;
  font-weight: bold;
  position: absolute;
  top: 110%;
  color: ${({error}) => error ? 'red' : 'transparent'}; // it will help to load font, and keep ready to show.
`;
