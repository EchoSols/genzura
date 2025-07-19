"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [portalType, setPortalType] = useState("product");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center mb-4">
          <div className="h-14 w-14 sm:h-12 sm:w-12 rounded-lg bg-blue-600 flex items-center justify-center mb-2">
            <Package className="h-8 w-8 sm:h-7 sm:w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-700">Sign in to Genzura</h1>
          <p className="text-gray-500 text-sm">Inventory Management System</p>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (!email || !password) {
            alert("Please fill in all fields");
            return;
          }
          setIsLoading(true);
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userPortal", portalType);
          setIsLoading(false);
          window.location.href = portalType === "service" ? "/service" : "/product";
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="you@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Portal</label>
            <Select value={portalType} onValueChange={setPortalType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product Portal</SelectItem>
                <SelectItem value="service">Service Portal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-right">
            <Link href="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</Link>
        </div>
      </div>
    </div>
  );
} 