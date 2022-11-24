import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { FiCircle } from "react-icons/fi";
import PlayerTurnContext from "../context/playerContext";

const Cell = ({ position, playerMovementsHandler }) => {
  const [icon, setIcon] = useState("none");
  const [isClicked, setIsClicked] = useState(false);
  const { playerTurn, changePlayerTurn } = useContext(PlayerTurnContext);
  const { clearBoard } = useSelector((state) => state?.gameReducer);
  const dispatch = useDispatch();

  const setIconHandler = () => {
    if (isClicked) {
      return;
    }
    console.log("PLAYER TURN: ", playerTurn);
    if (clearBoard) {
      dispatch({ type: "CLEAR_BOARD" });
    }

    if (playerTurn === 1) {
      setIcon("x");
    } else {
      setIcon("o");
    }

    setIsClicked(true)
    playerMovementsHandler(playerTurn, position);
    changePlayerTurn();
  };

  useEffect(() => {
    if (clearBoard) {
      setIcon("none");
      setIsClicked(false)
    }
  }, [clearBoard]);

  return (
    <div onClick={setIconHandler}>
      {!clearBoard && icon !== "none" ? (
        icon === "o" ? (
          <FiCircle />
        ) : (
          <GrClose />
        )
      ) : (
        "none"
      )}
    </div>
  );
};

export default Cell;
