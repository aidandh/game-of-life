import Grid from "./Grid"
import { useState } from "react"

export default function App() {
    const rows = 25;
    const cols = 25;
    const [grid, setGrid] = useState<boolean[][]>(Array(rows).fill(Array(cols).fill(false)));

    function setCell(i: number, j: number, value: boolean) {
        const newGrid = grid.map((row) => row.slice());
        newGrid[i][j] = value;
        setGrid(newGrid);
    }

    function countNeighbors(row: number, col: number) {
        let count = 0;
        const clamp = (n: number, m: number) => ((n % m) + m) % m;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i === row && j == col) continue;
                const iOverflow = clamp(i, grid.length);
                const jOverflow = clamp(j, grid[iOverflow].length);
                if (grid[iOverflow][jOverflow])
                    count++;
            }
        }
        console.log(count);
        return count;
    }

    function step() {
        const newGrid = grid.map((row, i) =>
            row.map((cell, j) => {
                const neighbors = countNeighbors(i, j);
                if (cell) {
                    if (neighbors < 2) return false;
                    else if (neighbors === 2 || neighbors === 3) return true;
                    else return false;
                } else {
                    if (neighbors === 3) return true;
                    else return false;
                }
            }))
        setGrid(newGrid);
    }

    return (
        <>
            <Grid grid={grid} setCell={setCell} />
            <button onClick={step}>Step</button>
        </>
    );
}