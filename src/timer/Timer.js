import { useEffect, useState, useMemo, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import PlayerTurnContext from "../context/playerContext";

const timerCalculations = (Component) => {
  return ({ deadline }) =>
    function () {

      const { playing } = useSelector((state) => state?.gameReducer);

      const deadlineRef = useRef(0);
      const [time, setTime] = useState(0);
      const [playerRanOutOfTime, setPlayerRanOutOfTime] = useState(false);
      const interval = useRef(null);

      const initTimer = () => {
        if (interval.current == null && playing) {
          // setPlayerRanOutOfTime(false)
          deadlineRef.current = calculateDeadline(deadline + 1);
          setTime(deadlineRef.current - Date.now());
          interval.current = setInterval(() => {
            setTime(deadlineRef.current - Date.now());
          }, 1000);
        }
      };

      const stopAndResetTimer = () => {
        stopTimer();
        deadlineRef.current = calculateDeadline(deadline + 2);
        initTimer();
      };

      const stopTimer = () => {
        setPlayerRanOutOfTime(false)
        clearInterval(interval.current);
        interval.current = null;
      }

      useEffect(() => {
        if (playing) {
          initTimer();
        }else {
          stopTimer();
          setTime(0)
        }
      }, [playing]);

      useEffect(() => {
        if (time < 1000) {
          if(playing) {
            setPlayerRanOutOfTime(true)
          }
          // stopAndResetTimer();
        }
      }, [time]);

      function calculateDeadline(deadline) {
        let timeObject = new Date();
        timeObject = new Date(timeObject.getTime() + 1000 * deadline);
        return Date.parse(timeObject);
      }

      return <Component time={time} stopAndResetTimer={stopAndResetTimer} playerRanOutOfTime={playerRanOutOfTime}/>;
    };
};

const Timer = ({ time, stopAndResetTimer, playerRanOutOfTime }) => {
  const { playerTurn, changePlayerTurn } = useContext(PlayerTurnContext);
  const playerTurnRef = useRef(playerTurn);

  useEffect(() => {
    console.log(playerTurn, "---", playerTurnRef)
    if(playerTurnRef !== playerTurn) {
      playerTurnRef.current = playerTurn;
      stopAndResetTimer();
    }
  }, [playerTurn]);

  useEffect(() => {
    console.log(playerRanOutOfTime)
    if(playerRanOutOfTime) {
      changePlayerTurn();
    }
  }, [playerRanOutOfTime]);

  useEffect(() => {
  }, [time])

  return <div>{time}</div>;
};

export default timerCalculations(Timer)({ deadline: 5 });
