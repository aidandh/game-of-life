import styles from "./Grid.module.css";
import classNames from "classnames";

type GridProps = {
    grid: boolean[][];
    setCell: (i: number, j: number, value: boolean) => void;
};

export default function Grid({ grid, setCell }: GridProps) {
    return (
        <div className={styles.grid}>
            {grid.map((row, i) =>
                <div className={styles.gridRow}>
                    {row.map((cell, j) =>
                        <div
                            className={classNames(styles.cell, cell ? styles.alive : styles.dead)}
                            onClick={() => setCell(i, j, !cell)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}