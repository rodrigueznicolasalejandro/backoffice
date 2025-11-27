import { Card, Label } from "@link/styleguide";
import { useEffect, useState } from "react";
// import { getUserAccount } from "../../services/UserService";

const HeaderApp = () => {
  const [userName, setUserName] = useState("Juliana Martinez");
  // useEffect(() => {
  //   getUserAccount().then(
  //     (response) => {
  //       if (response?.data) {
  //         const firstName = response.data.first_name || "";
  //         const lastName = response.data.last_name || "";
  //         setUserName(`${firstName} ${lastName}`.trim());
  //       }
  //     }
  //   )
  // })
  return (
    <Card
      variant="natural"
      modifier="container"
      border_radius_amount="6"
      display="flex"
      justify_content="flex-end"
      align_items="center"
      margin={{ top: "200", bottom: "200" }}
      width="100%"
      height="100px"
    >
      <Label margin="800" type="md" weight="medium">
        {userName}
      </Label>
    </Card>
  );
};

export default HeaderApp;
