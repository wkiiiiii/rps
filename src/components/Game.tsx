'use client';

import { useState } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = 'win' | 'lose' | 'draw' | null;

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const choices: ('rock' | 'paper' | 'scissors')[] = ['rock', 'paper', 'scissors'];

  const choiceImages: Record<string, string> = {
    rock: '👊',
    paper: '✋',
    scissors: '✌️',
  };

  const getComputerChoice = (): 'rock' | 'paper' | 'scissors' => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return 'draw';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const playGame = (choice: 'rock' | 'paper' | 'scissors') => {
    setIsPlaying(true);
    setPlayerChoice(choice);
    
    // Reset computer choice and result
    setComputerChoice(null);
    setResult(null);
    
    // Simulate computer thinking
    setTimeout(() => {
      const computerSelection = getComputerChoice();
      setComputerChoice(computerSelection);
      
      const gameResult = determineWinner(choice, computerSelection);
      setResult(gameResult);
      
      // Update score
      if (gameResult === 'win') {
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else if (gameResult === 'lose') {
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
      
      setIsPlaying(false);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setScore({ player: 0, computer: 0 });
    setIsPlaying(false);
  };

  // Result message
  const getResultMessage = (): string => {
    if (result === 'win') return 'You win!';
    if (result === 'lose') return 'You lose!';
    if (result === 'draw') return 'It\'s a draw!';
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-md">
      <h1 className="text-3xl font-bold mb-8">Rock Paper Scissors</h1>
      
      {/* Score */}
      <div className="flex justify-between w-full mb-8">
        <div className="text-center">
          <p className="text-lg font-semibold">You</p>
          <p className="text-2xl">{score.player}</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">Computer</p>
          <p className="text-2xl">{score.computer}</p>
        </div>
      </div>
      
      {/* Game area */}
      <div className="flex justify-between items-center w-full mb-8">
        <div className="text-center">
          <div className="text-6xl mb-2">
            {playerChoice ? choiceImages[playerChoice] : '❓'}
          </div>
          <p>Your choice</p>
        </div>
        
        <div className="text-2xl font-bold">VS</div>
        
        <div className="text-center">
          <div className="text-6xl mb-2">
            {computerChoice 
              ? choiceImages[computerChoice] 
              : isPlaying 
                ? '🤔' 
                : '❓'}
          </div>
          <p>Computer</p>
        </div>
      </div>
      
      {/* Result */}
      {result && (
        <div className={`text-xl font-bold mb-6 ${
          result === 'win' 
            ? 'text-green-500' 
            : result === 'lose' 
              ? 'text-red-500' 
              : 'text-yellow-500'
        }`}>
          {getResultMessage()}
        </div>
      )}
      
      {/* Choices */}
      <div className="flex justify-center gap-4 mb-8">
        {choices.map((choice) => (
          <button
            key={choice}
            className={`
              p-4 rounded-full text-4xl 
              ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 active:bg-gray-200'}
              ${playerChoice === choice ? 'bg-blue-100' : ''}
            `}
            onClick={() => !isPlaying && playGame(choice)}
            disabled={isPlaying}
            aria-label={choice}
          >
            {choiceImages[choice]}
          </button>
        ))}
      </div>
      
      {/* Reset button */}
      <button
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
} 