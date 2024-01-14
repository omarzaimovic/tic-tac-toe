import "./App.css";
import { useState, useEffect } from "react";
import { WINNING_COMBINATIONS } from "./constans";

const App = () => {
  const [activePlayer, setactivePlayer] = useState("X"); // player
  const [boardValue, setboardValue] = useState(Array(9).fill(null)); // sva polja na null
  const [gameover, setgameover] = useState(false);
  const [winner, setwinner] = useState(null);
  const [score,setscore]=useState({
    X:0,
    O:0,
    DRAWS:0
  })

  const checkforWinner = () => {
    let user = null;
    const haveWinner = WINNING_COMBINATIONS.some((combination) => {
      const [firstindex, secondindex, thirdindex] = combination;
      if (
        boardValue[firstindex] &&
        boardValue[firstindex] === boardValue[secondindex] &&
        boardValue[firstindex] === boardValue[thirdindex]
      ) {
        user = boardValue[firstindex];
        return true;
      }
      return false;
    });

    if (haveWinner) {
      const scorecopy={...score};
      scorecopy[user] +=1;
      setscore(scorecopy);

      setwinner(user);
      setgameover(true);
    }

    const AllFields=boardValue.every((value)=>value);

    if(!haveWinner && AllFields ){
      const scorecopy={...score};
      scorecopy.DRAWS +=1;
      setscore(scorecopy);
      setgameover(true);

    }
  };

  const handleClick = (index) => {
    if (boardValue[index] || gameover) {
      return;
    }

    //shalow copy
    const boardValueCopy = [...boardValue];
    //dinamicko dodavanje varijable
    boardValueCopy[index] = activePlayer;

    setboardValue(boardValueCopy);
    setactivePlayer(activePlayer === "X" ? "O" : "X");
  };

  const reset=()=>{
    setactivePlayer('X');
    setboardValue(Array(9).fill(null));
    setgameover(false);
    setwinner(null)
  }

  useEffect(() => {
    checkforWinner();
  }, [boardValue]);

  return (
    <div className="App">
      <div className="App-header">
        <h3>Tic Tec Toe</h3>
        <div className="board">
          <div className="row-1">
            <div className="field" onClick={() => handleClick(0)}>
              {boardValue[0]}
            </div>
            <div className="field" onClick={() => handleClick(1)}>
              {boardValue[1]}
            </div>
            <div className="field" onClick={() => handleClick(2)}>
              {boardValue[2]}
            </div>
          </div>

          <div className="row-2">
            <div className="field" onClick={() => handleClick(3)}>
              {boardValue[3]}
            </div>
            <div className="field" onClick={() => handleClick(4)}>
              {boardValue[4]}
            </div>
            <div className="field" onClick={() => handleClick(5)}>
              {boardValue[5]}
            </div>
          </div>

          <div className="row-3">
            <div className="field" onClick={() => handleClick(6)}>
              {boardValue[6]}
            </div>
            <div className="field" onClick={() => handleClick(7)}>
              {boardValue[7]}
            </div>
            <div className="field" onClick={() => handleClick(8)}>
              {boardValue[8]}
            </div>
          </div>
        </div>
        {gameover && (
          <div>
            <p>game over</p>
            {winner?<p>winner is {winner}</p>:"draw"}
            <button className="new-game" onClick={reset}>Play new game</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
