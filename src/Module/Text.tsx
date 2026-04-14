type TextProps = {
  children?: React.ReactNode;
};

const Text = ({ children = "no text" }: TextProps) => {
  return <p className="text-gray-600">{children}</p>;
};

export default Text;