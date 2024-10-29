const PrimaryInput = ({...props}: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
           <input
            className="input input-primary focus:outline-0 w-full focus:border-[1.5px]"
            {...props}
          />
    );
}

export default PrimaryInput;
