import fs from 'fs';
import path from 'path';

function readMathProblems() {
  const filePath = path.join(path.dirname(new URL(import.meta.url).pathname), 'input.txt');
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  // Transponer la matriz para analizar columnas
  const maxLen = Math.max(...lines.map(l => l.length));
  const paddedLines = lines.map(l => l.padEnd(maxLen, ' '));
  const columns = Array.from({length: maxLen}, (_, i) => paddedLines.map(l => l[i]));
  // Identificar columnas separadoras (todas espacios)
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
    // Para cada línea, extraer los caracteres de las columnas relevantes
    const problemLines = paddedLines.map(l => colIdxs.map(idx => l[idx]).join('').trim());
    // Filtrar líneas vacías
    const filtered = problemLines.filter(l => l.length > 0);
    // El último elemento es el operador
    const op = filtered[filtered.length - 1];
    const numbers = filtered.slice(0, -1).map(Number);
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

console.log(results);
