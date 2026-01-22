import { ReactNode, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("adminAuth") === "true";
    });
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [, setLocation] = useLocation();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Using environment variable for password or fallback to a default for initial setup
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

        if (password === correctPassword) {
            localStorage.setItem("adminAuth", "true");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Incorrect password");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        setIsAuthenticated(false);
        setLocation("/");
    };

    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white border-b shadow-sm">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <h1 className="text-xl font-serif font-semibold text-charcoal">Admin Dashboard</h1>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <Lock className="w-6 h-6 text-charcoal" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl text-center font-serif text-charcoal">Admin Access</CardTitle>
                    <CardDescription className="text-center">
                        Enter the password to access the content management dashboard.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className={error ? "border-red-500" : ""}
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full bg-charcoal hover:bg-gray-800 text-white">
                            Login
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
