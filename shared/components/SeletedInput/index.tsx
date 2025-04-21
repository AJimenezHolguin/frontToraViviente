import type {Selection} from "@heroui/react";

import React from "react";
import {Select, SelectItem} from "@heroui/react";
import { dataSongs, CategoryProps } from '../table/data/dataSong';


export const SelectedInput = () => {
  const [value, setValue] = React.useState<Selection>(new Set([]));

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        
        label="Categoría"
        placeholder="Selecciona una categoría"
        selectedKeys={value}
        variant="bordered"
        onSelectionChange={setValue}
      >
       {Object.values(CategoryProps).map((category) => (    
          <SelectItem key={category} textValue={category}>
            {category}  
            </SelectItem>
        ))}
      </Select>
      
    </div>
  );
}
