import { COLORS } from "@/styles/colors"
import { Text } from "../Text"
import { WrapperProps} from "../../../types/wrapperProps"


export const WrapperTitle: React.FC<WrapperProps> = ( {title, children} ) => {

    return(
        <div className="w-full px-3 py-1">
      <Text 
        $color={COLORS.primary}
        $ta="center" 
        $v="h3" 
        className="p-6"
        >{title}
        </Text>
      {children}
    </div>
    )
}