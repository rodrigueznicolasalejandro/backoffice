import { Card, Label } from "@link/styleguide";
import { useEffect, useState } from "react";
// import { getUserAccount } from "../../services/UserService";

const HeaderApp = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Obtener usuario de localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.username || "Usuario");
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        setUserName("Usuario");
      }
    }
  }, []);

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    
    // Redirigir al login
    window.location.href = '/bo/login';
  };

  return (
    <Card
      variant="natural"
      modifier="container"
      border_radius_amount="4"
      display="flex"
      justify_content="flex-end"
      align_items="center"
      margin={{ top: "200", bottom: "200" }}
      padding={{ right: "100" }}
      width="100%"
      height="50px"
    >
      <Label type="md" weight="medium">
        {userName}
      </Label>
      <button
        onClick={handleLogout}
        style={{
          marginLeft: '16px',
          padding: '8px 16px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
      >
        Cerrar sesión
      </button>
    </Card>
  );
};

export default HeaderApp;
