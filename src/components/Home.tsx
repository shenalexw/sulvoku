import React, { Component, RefObject  } from "react";
import Snackbar from "./Snackbar"
import Cell from "./Cell";
import { solve } from "../util";
import "../css/Home.css";
type Props = {};

type State = {
  originalBoard: number[][]
  board: number[][];
  message: string;
};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalBoard: [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ],
      board: [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ],
      message: ""
    };
    this.handleClearMessage = this.handleClearMessage.bind(this);
    this.handleUpdateCell = this.handleUpdateCell.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSolve(): void {
    // Make a deepcopy
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    const boolSolved : Boolean = solve(newBoard)
    console.log(boolSolved);
    this.handleChangeMessage( boolSolved ? "Puzzle has been Solved!" : "Uh Oh something went wrong :");
    this.setState({ board: newBoard });
  }

  handleGenerate(): void {
    this.handleChangeMessage( "Puzzle has been generated!");
  }

  handleChangeMessage(message: string): void{
    this.setState({message: message })
  }

  handleClearMessage(): void{
    console.log("message cleared")
    this.setState({message: ""})
  }

  handleReset(): void{
    this.setState({
      board: this.state.originalBoard
    })
    this.handleChangeMessage("Board has been reset")
  }

  handleUpdateCell(value: number, rowIndex: number, colIndex: number): void{
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    newBoard[rowIndex][colIndex] = value
    this.setState({
      board: newBoard
    })
  }

  render() {
    return (
      <>
        <h1 className="title">Sulvoku</h1>
        <div className="grid">
          {this.state.board.map((row, rowIndex) => {
            return (
              <div className="grid-row" key={rowIndex}>
                {row.map((num, colIndex) => (
                  // <div ref={this.myRef} tabIndex={0} className="grid-block" key={colIndex} onClick={this.handleClick} onFocus={(event) => this.handleKeyDown(event)}>{num}</div>
                  <Cell key={colIndex} rowIndex={rowIndex} colIndex={colIndex} number={num} handleCellUpdate={this.handleUpdateCell} static={this.state.originalBoard[rowIndex][colIndex] !== 0 ? true : false}/>
                ))}
              </div>
            );
          })}
        </div>
        <div className="button-options">
          <button className="basic-button" onClick={() => this.handleGenerate()}>Generate</button>
          <button className="basic-button" onClick={() => this.handleSolve()}>Solve</button>
          <button className="basic-button" onClick={() => this.handleReset()}>Reset</button>
        </div>
        <Snackbar message={this.state.message} clearMessage={this.handleClearMessage}/>
      </>
    );
  }
}
