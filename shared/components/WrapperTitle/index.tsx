import { COLORS } from "@/styles/colors"
import { Text } from "../Text"
import { WrapperTitleProps } from "./types"


export const WrapperTitle: React.FC<WrapperTitleProps> = ( {title, children} ) => {

    return(
        <div className="w-ful px-6 py-4">
      <Text 
        $color={COLORS.primary}
        $ta="center" 
        $v="h3" 
        className=" mb-4">{title}
        </Text>
      {children}
    </div>
    )
}