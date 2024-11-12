interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  disabled,
  loading,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`p-1 px-4 bg-black/70 border-2 border-yellow-400 text-yellow-400 font-bold text-sm rounded-full ${
        loading
          ? " opacity-50 cursor-progress"
          : " hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      }`}
      type="button" // hardcode to button as we won't need any submit buttons
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
