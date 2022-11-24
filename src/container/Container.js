import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Cell from "./Cell";
import PlayerTurnContext from "../context/playerContext";

const Container = () => {
  const [player1Movements, setPlayer1Movements] = useState([]);
  const [player2Movements, setPlayer2Movements] = useState([]);
  const { winningCombinations } = useContext(PlayerTurnContext);
  const { clearBoard } = useSelector((state) => state?.gameReducer);
  const dispatch = useDispatch();

  const setPlayerMovements = (player, cell) => {
    if (player === 1) {
      setPlayer1Movements(prevArray => { 
        const newArray = [...prevArray];
        newArray.push(cell)
        return newArray;
      });
    } else {
      setPlayer2Movements(prevArray => { 
        const newArray = [...prevArray];
        newArray.push(cell)
        return newArray;
      });
    }
  };

  let containsAllElements = (array, target) =>{
    // console.log(array,"---",target);
    return target.every((value) => array.includes(value));
  }

  useEffect(() => {
    checkForPlayerMovements(player1Movements, 1);
  }, [player1Movements]);

  useEffect(() => {
    checkForPlayerMovements(player2Movements, 2);
  }, [player2Movements]);

  useEffect(() => {
    if(clearBoard){
      setPlayer1Movements([]);
      setPlayer2Movements([]);
    }
  }, [clearBoard])

  const checkForPlayerMovements = (playerMovements, player) => {
    // console.log(playerMovements, player);
    for (let i = 0; i < winningCombinations.length; i++) {
      const targetCombination = winningCombinations[i];
      if (containsAllElements(playerMovements, targetCombination)) {
        if (player === 1) {
          dispatch({ type: "INCREASE_PLAYER_1_SCORE" });
        } else {
          dispatch({ type: "INCREASE_PLAYER_2_SCORE" });
        }
        dispatch({type: "TOGGLE_PLAY_STATE"});
      }
    }
  };

  return (
    <div>
      <Grid container spacing={1}>
        {[...Array(9).keys()].map((n) => {
          return (
            <Grid item xs={4} key={n + 1}>
              <Cell
                position={n + 1}
                playerMovementsHandler={setPlayerMovements}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Container;
