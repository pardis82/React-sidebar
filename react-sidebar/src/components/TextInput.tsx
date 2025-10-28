interface TextInputProps {
  id: string;
  label: string;
  value: string;
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function TextInput({
  id,
  label,
  value,
  type,
  placeholder,
  onChange,
  disabled = false,
  required = false,
  className = "",
}: TextInputProps) {
  return (
    <>
      <div className="relative m-5">
        <input
          id={id}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`block  px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 appeareance-none peer ${className}`}
        ></input>
        <label
          className={` absolute transition-all duration-300 transform  scale-75 top-2 z-10 
            bg-inherit peer-focus:px-2 peer-focus:text-blue-300 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
            peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto right-3
            peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75
           px-3 text-sm font-medium text-gray-600 pointer-events-none`}
          htmlFor={id}
        >
          {required && <span className="text-red-500">*</span>}
          {label}
        </label>
      </div>
    </>
  );
}
