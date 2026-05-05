import { COLORS } from "@/styles/colors";
import { TableColumnType } from "./types";
import { User } from "@/components/login/domain/models/user";
import { Text } from "@/shared/components/Text";
import { capitalizeFirstLetter, formatUserRole } from "@/shared/utils/capitalizeFirstLetter";
import { getUserRoleColor } from "@/styles/usersRoleStyles";

export const usersColumns:TableColumnType<User>[] = [
  {
    uid: "name",
    name: "NOMBRE",
    align: "start",
    render: (user: User) => (
      <Text $color={user.isActive === true ? "" : COLORS.light_gray}>
      <span>
        {user.name
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </span>
      </Text>
    ),
  },

  {
    uid: "email",
    name: "USUARIO",
    align: "start",
    render: (user: User) => {
      const name = user.email;
      const isActive = user.isActive;

      if(!name){
        return <span className="text-gray-400">Sin usuario</span>;
      }

      const formattedName = name 
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
 
      return (
      <span className={!isActive ? "opacity-50 italic" : ""}>
        {formattedName}
      </span>
      )
    },
  },

{
    uid: "role",
    name: "ROL DEL USUARIO",
    align: "center",
    render: (user: User) => {
      const roleStyle = getUserRoleColor(user.role);
      
      return (
        <Text
          className={"inline-flex px-2 rounded-lg"}
          $ta={"center"}
          $color={user.isActive === true ? roleStyle.$color : COLORS.light_gray}
          $bg={user.isActive === true ? roleStyle.$bg : COLORS.transparent}
          $fw={500}
        >
          <span>{formatUserRole(user.role)}</span>
        </Text>
      );
    },
  },
  {
    uid: "isActive",
    name: "ESTADO",
    render: (user: User) => {
        const status = user.isActive ? "Activo" : "Inactivo";
     
        return (
      <Text
        $color={user.isActive === true ? COLORS.secondary : COLORS.light_gray}
        $fw={500}
      >
        <span>{capitalizeFirstLetter(status)}</span>
      </Text>
      )
    },
  },

];