import { DeepPartial, FlowbiteTextInputTheme, ThemeProps } from "flowbite-react";

const textInputTheme: DeepPartial<FlowbiteTextInputTheme> = {
  field: {
    input: {
      base: 'focus:outline-blue-500 block w-full border disabled:cursor-not-allowed disabled:opacity-50'
    }
  }
};

export default function Theme(): ThemeProps {
  return {
    theme: {
      textInput: textInputTheme
    }
  }
}
