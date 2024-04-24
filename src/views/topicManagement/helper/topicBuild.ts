import { TopicDataAdmin } from './rules.ts';

export function generateMathProblems(count: number): TopicDataAdmin[] {
  const operations = ['+', '-', '*', '/'];
  const difficulties = ['简单', '中等', '困难'];
  const tableData: TopicDataAdmin[] = [];

  for (let i = 1; i <= count; i++) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

    let answer: number;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        // 确保 num2 不为 0
        while (num2 === 0) {
          num2 = Math.floor(Math.random() * 10) + 1;
        }
        // answer = num1 / num2;
        // 如果需要整数答案，可以使用 Math.floor 来取整
        answer = Math.floor(num1 / num2);
        break;
      default:
        answer = 0; // 如果运算符不是预期的四种之一，给 answer 一个默认值
    }

    tableData.push({
      problemid: i,
      parm1: num1.toString(),
      parm2: num2.toString(),
      answer: answer.toString(),
      symbol: operation,
      rank: difficulty
    });
  }

  return tableData;
}
