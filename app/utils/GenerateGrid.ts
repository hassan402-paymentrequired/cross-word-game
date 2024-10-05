// utils/crosswordUtils.js

export const generateCrossword = (words:any) => {
    const gridSize = 10; 
    const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
                grid[row][col] = words[Math.floor(Math.random() * words.length)];
        }
    }
    return grid;
};
