const PrimaryInput = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input className="w-full focus:border-[1.5px] focus:outline-0" {...props} />
  );
};

export default PrimaryInput;
