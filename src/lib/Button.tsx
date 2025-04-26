export const Button = ({
  children,
  onClick,
  disabled,
  small,
}: {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  small?: boolean;
}) => {
  return (
    <button
      // todo: make button small when small is true
      className={`px-4 py-2 bg-blue-500 text-white rounded ${small ? "" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
