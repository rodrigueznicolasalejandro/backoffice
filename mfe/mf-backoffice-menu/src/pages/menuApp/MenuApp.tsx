import { useState } from "react";
import { Card, Collapsible, Divider } from "@link/styleguide";
import mockMenu from "../../mock/menu.json";
import { redirectTo } from "@link/security-module";

const MenuApp = () => {
  const [menuItems, setMenuItems] = useState(mockMenu);
  return (
    <Card
      margin={{ top: "200", right: "200" }}
      variant="natural"
      modifier="container"
      border_radius_amount="6"
      display="flex"
      flex_direction="column"
      justify_content="space-between"
      height="calc(100vh - 60px)"
      width="233px"
    >
      <Card margin="200" padding="200">
        <img
          src="/public/assets/logo/logo.png"
          width="40"
          height="40"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <Card>
          <Collapsible
            data={menuItems}
            onNavigate={(url) => redirectTo(url)}
            logoImg="/public/assets/logo/logo.png"
          />
          <Divider variant="neutral" modifier="outline" width="100px" />
        </Card>
      </Card>
    </Card>
  );
};

export default MenuApp;
