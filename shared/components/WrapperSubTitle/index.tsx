import { COLORS } from "@/styles/colors"
import { Text } from "../Text"
import { WrapperProps } from "../../../types/wrapperProps"



export const WrapperSubTitle: React.FC<WrapperProps> = ( {title, children} ) => {

    return(
        <div className="w-ful py-4">
      <Text 
        $color={COLORS.primary}
        $ta="left" 
        $v="h5" 
        className="pl-4 ml-1"
        >{title}
        </Text>
      {children}
    </div>
    )
}