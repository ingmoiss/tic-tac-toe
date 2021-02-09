import React from "react";
import { Board } from "./board";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        //Se crea un objeto history para aceder a moviemientos pasados
        {
          squares: Array(9).fill(null), //Se crea un arreglo el cual contiene el valor de nuestos cuadros
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  //Metodo que estable un valor dentro de nuestro cuadro
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li className="m-auto" key={move}>
          <button className="btn btn-light mt-2" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="">
        <div className="row">
          <div className="col-md mt-3">
            <h1 className="text-center text-light">TicTacToe in React</h1>
          </div>
        </div>
        <div className="text-center mb-2 text-light">{status}</div>
        <div className="row">
          <div className="col-md m-auto">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md">
            <ol className="d-flex flex-column p-0 mt-3" style={{ listStyle: "none" }}>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

//Metodo determinar si hay un ganador
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
