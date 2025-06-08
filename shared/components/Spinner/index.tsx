import { Spinner } from "@heroui/react";
import { SpinnerVariant } from "./types";
import { ColorButton } from "@/styles/colorButton.enum";
import { Sizes } from "@/types/sizes.enum";

export const SpinnerComponent = () => {
  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "calc(100vh - 100px)"}}
    >
      <Spinner
        color={ColorButton.PRIMARY}
        size={Sizes.MD}
        variant={SpinnerVariant.WAVE}
      />
    </div>
  );
};
