import { makeObservable, observable, runInAction } from "mobx";

export class SquareStore {
  squares = [];

  constructor() {
    makeObservable(this, {
      squares: observable,
    });
  };

  setSquares(squares) {
    runInAction(() => {
      this.squares = squares;
    });
  }

  updateSquares(arrayRowIndex, arrayColIndex) {
    const refItem = this.squares[arrayRowIndex][arrayColIndex];

    runInAction(() => {
      refItem.hovered = !refItem.hovered;
    });
  };

};

export default new SquareStore();
