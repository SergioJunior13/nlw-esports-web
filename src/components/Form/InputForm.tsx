import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      {...props}
      className="px-4 py-3 bg-zinc-900 rounded w-full"
    />
  );
}

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className="font-semibold block mb-2">
      {props.children}
    </label>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: string;
  hoverBgColor: string;
}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`flex gap-3 items-center px-5 py-3 font-semibold rounded-md ${props.bgColor} hover:${props.hoverBgColor}`}
    >
      {props.children}
    </button>
  );
}
