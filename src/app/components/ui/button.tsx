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
      className={`border border-gray-300 rounded-md px-2 py-1${
        loading
          ? " opacity-50 cursor-progress"
          : " disabled:opacity-50 disabled:cursor-not-allowed"
      }`}
      type="button" // hardcode to button as we won't need any submit buttons
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
