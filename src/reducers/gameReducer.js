export const defaultState = {
  playing: false,
  clearBoard: true,
  player1Score: 0,
  player2Score: 0,
};

const gameReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CLEAR_BOARD":
      return { ...state, clearBoard: !state.clearBoard };
    case "TOGGLE_PLAY_STATE":
      return { ...state, playing: !state.playing };
    case "INCREASE_PLAYER_1_SCORE":
      return { ...state, player1Score: state.player1Score + 1 };
    case "INCREASE_PLAYER_2_SCORE":
      return { ...state, player2Score: state.player2Score + 1 };
    case "RESET":
      return { ...state, playing: false, player1Score: 0, player2Score: 0, clearBoard: true };
    default:
      return state;
  }
};

export default gameReducer;
