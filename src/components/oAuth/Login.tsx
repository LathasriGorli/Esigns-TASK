import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { getAuthUrl } from "@/http/services/auth";

export function Login() {
  const handleLogin = async () => {
    try {
      const data = await getAuthUrl();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Authorization URL missing in response");
      }
    } catch (error) {
      toast.error("Failed to get authorization URL");
    }
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
