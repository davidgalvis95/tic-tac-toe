import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {

  const { playing, player1Score, player2Score } = useSelector((state) => state?.gameReducer);
  const dispatch = useDispatch();

  const handleInitialPlay = () => {
    dispatch({type: "TOGGLE_PLAY_STATE"});
  }
  
  const handleRestart = () => {
    dispatch({type: "TOGGLE_PLAY_STATE"});
    dispatch({type: "CLEAR_BOARD"});
  }

  const handleReset = () => {
    dispatch({type: "RESET"})
  }

  return (
    <div>
      <div>player 1 score: {player1Score}</div>
      <div>player 2 score: {player2Score}</div>
      <button disabled={playing || player1Score >0 || player2Score >0} onClick={handleReset}>reset</button>
      {/* <button disabled={!playing} onClick={() => dispatch({type: "RESET"})}>reset</button> */}
      {
        !playing && player1Score ===0 && player2Score ===0?
        <button onClick={handleInitialPlay}>play</button>:
        <button disabled={playing} onClick={handleRestart}>restart</button>
      }
    </div>
  );
};

export default Header;
