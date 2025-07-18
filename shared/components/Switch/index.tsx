import {Switch} from "@heroui/react";

type Props = {
    isSelected: boolean;
    onChange: (val: boolean) => void;
  }

export const SwitchComponent = ({isSelected, onChange}:Props) => {
    return (
        <Switch 
        defaultSelected
        aria-label="Playlist visible"
        isSelected={isSelected}
        size="sm"
        onChange={(event) => onChange(event.target.checked)}
        
        />
    )
}