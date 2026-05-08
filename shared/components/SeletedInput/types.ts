

// export interface SelectedInputProps {
//     value: string;
//     onChange: (value: string) => void;
//     isRequired?: boolean;
//   }

  export interface SelectOption {
    label: string;
    value: string;
  }
  
  export interface SelectedInputProps {
    value: string;
    label: string;
    placeholder: string;
    options: SelectOption[];
    isRequired?: boolean;
    onChange: (value: string) => void;
  }