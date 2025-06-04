import { Text } from "../Text"
import { WrapperTitleProps } from "./types"


export const WrapperTitle: React.FC<WrapperTitleProps> = ( {title, children} ) => {

    return(
        <div className="w-ful px-6 py-4">
      <Text 
        $ta="center" 
        $v="h3" 
        className=" mb-4 text-primary">{title}
        </Text>
      {children}
    </div>
    )
}