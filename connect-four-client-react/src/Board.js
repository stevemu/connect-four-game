import React from 'react';
import { postNewBoard, getBoardData, resetBoard } from './api/boardApi';
// import axios from 'axios';

// test();
// console.log(test());
/*
* user 1: blue
* user 2: yellow
*
* */
class Board extends React.Component {

  constructor(props) {
    super(props);

    let userId = props.match.params.userId;

    let initBoard = [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];

    this.state = {
      userId,
      board: initBoard,
      turnText: ""
    };

    setInterval(() => {

      getBoardData(this.state.userId).then((json) => {
        let newBoard = json.board;
        this.setState({board: newBoard});

        let turnText = json.isTurn ? "Your Turn" : "Wait for your opponent";
        this.setState({turnText});

      });

    }, 1000);

  }

  colClicked(colId) {
    let board = this.state.board;

    if (board[colId].length < 6) {
      board[colId].push(this.state.userId);
      this.setState({ board });

      // post new board to backend
      postNewBoard(this.state.userId, board).then((json) => {
        if (json.success == true) {
          console.log('data sent to server');
        }
      });

    }

  }

  generateDotsForCol(colId) {

    if (!this.state.board[colId]) {
      return;
    }

    return this.state.board[colId].map((currentVal, index) => {
      if (currentVal == 1) {
        return (
          <div className="row blue" key={index} />
        );
      } else if (currentVal == 2) {
        return (
          <div className="row yellow" key={index} />
        );
      }

    });
  }

  resetBoard() {
    resetBoard().then((json) => {
      if (json.success == true) {
        console.log('board reset success');
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Player {this.state.userId}</h1>
        <button onClick={this.resetBoard.bind(this)}>Reset</button>
        <p>Instruction: Click on a column to drop your ball</p>
        <div id="board-container">
          <div className="col" onClick={() => this.colClicked(0)}>
            {this.generateDotsForCol(0)}
          </div>
          <div className="col" onClick={() => this.colClicked(1)}>
            {this.generateDotsForCol(1)}
          </div>
          <div className="col" onClick={() => this.colClicked(2)}>
            {this.generateDotsForCol(2)}
          </div>
          <div className="col" onClick={() => this.colClicked(3)}>
            {this.generateDotsForCol(3)}
          </div>
          <div className="col" onClick={() => this.colClicked(4)}>
            {this.generateDotsForCol(4)}
          </div>
          <div className="col" onClick={() => this.colClicked(5)}>
            {this.generateDotsForCol(5)}
          </div>
          <div className="col" onClick={() => this.colClicked(6)}>
            {this.generateDotsForCol(6)}
          </div>
        </div>

        <p className="turn">
          {this.state.turnText}
        </p>
      </div>
    );
  }
}

export default Board;
