import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";

// const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const API_BASE = import.meta.env.VITE_PUBLIC_API_URL;

export function Login() {
  const handleLogin = () => {
    const authUrl = `https://v2-dev-api.esigns.io/v1.0/oauth/client-authorize?response_type=code&client_id=2d97868e-1db8-43b8-8c3a-b0392178cc71&redirect_uri=http://localhost:3000/auth/callback
    &scope=create+delete+read+update&state=OAuth`;

    const getUrl = async () => {
      try{
      const response = await fetch(authUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to authenticate");
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Login error:', error);
    }
    };
    getUrl();
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[300px] p-4">
        <CardTitle className="text-lg">Esigns Login</CardTitle>
        <CardContent className="flex justify-center">
          <Button
            onClick={handleLogin}
            className="cursor-pointer bg-blue-700 text-white hover:bg-blue-800 text-base font-light"
          >
            Login with Esigns
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
