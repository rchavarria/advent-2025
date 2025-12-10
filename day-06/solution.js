import fs from 'fs';
import path from 'path';

function readMathProblems() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  // Transponer la matriz para analizar columnas
  const maxLen = Math.max(...lines.map(l => l.length));
  const paddedLines = lines.map(l => l.padEnd(maxLen, ' '));
  const columns = Array.from({length: maxLen}, (_, i) => paddedLines.map(l => l[i]));
  // Identificar bloques de columnas (problemas) separados por columnas de solo espacios
  let problemCols = [];
  let current = [];
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].every(c => c === ' ')) {
      if (current.length > 0) {
        problemCols.push(current);
        current = [];
      }
    } else {
      current.push(i);
    }
  }
  if (current.length > 0) problemCols.push(current);
  // Extraer problemas
  const problems = problemCols.map(colIdxs => {
    // Para cada columna, extraer los caracteres de las filas relevantes
    // La última fila es el operador
    const op = paddedLines[paddedLines.length - 1][colIdxs[0]]; // operador en la primera columna del bloque
    // Para cada columna, tomar todas las filas menos la última
    const numberDigitsByCol = colIdxs.map(idx =>
      paddedLines.slice(0, -1).map(l => l[idx]).join('').trim()
    );
    // Filtrar columnas vacías (pueden aparecer si hay espacios extra)
    const numbers = numberDigitsByCol
      .filter(digits => digits.length > 0)
      .map(digits => Number(digits));
    return { numbers, op };
  });
  return problems;
}

function solve(problem) {
  const { numbers, op } = problem;
  if (op === '+') {
    return numbers.reduce((a, b) => a + b, 0);
  } else if (op === '*') {
    return numbers.reduce((a, b) => a * b, 1);
  } else {
    throw new Error(`Unknown op: ${op}`);
  }
}

const problems = readMathProblems();
const results = problems.map(solve);
// console.log(results);

const total = results.reduce((a, b) => a + b, 0);

console.log('Grand total:', total); // 6172481852142
