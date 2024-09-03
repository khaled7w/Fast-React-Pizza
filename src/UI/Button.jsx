// Button.js
import React from 'react';
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base = `inline-block rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring text-sm focus:ring-offset-2 disabled:cursor-not-allowed`;

  const styles = {
    primary:
      base +
      ' bg-yellow-400 text-white px-4 py-3 md:px-6 md:py-4 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300',
    small:
      base +
      ' bg-yellow-400 text-white px-4 py-2 md:px-5 md:py-2.5 text-xs hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300',
    round:
      base +
      ' bg-yellow-400 text-white px-2.5 py-1 md:px-3.5 md:py-2 text-xs hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300',

    secondary:
      base +
      ' border-2 border-stone-300 text-stone-400 px-4 py-2.5 md:px-6 md:py-3.5 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:ring-stone-200',
  };

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles[type]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${styles[type]} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
