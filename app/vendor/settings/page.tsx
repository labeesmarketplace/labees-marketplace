"use client"

import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Store,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Camera,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Key,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    orders: true,
    marketing: false,
    updates: true,
    security: true,
  })
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const { toast } = useToast()

  const handleSave = (section) => {
    toast({
      title: "Settings Saved! ✅",
      description: `Your ${section} settings have been updated successfully`,
    })
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <VendorSidebar />
        <main className="flex-1 p-6 bg-gradient-to-br from-[#FAF8F4] via-white to-[#F0F9FF]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-[#003153]">Settings</h1>
                <p className="text-gray-600">Manage your account and store preferences</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] text-white px-4 py-2">
              <Shield className="w-3 h-3 mr-1" />
              Verified Account
            </Badge>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="store" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Store
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Payments
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white">
                Security
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-[#00A388] data-[state=active]:text-white"
              >
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Profile Information</h3>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">First Name</label>
                        <Input defaultValue="Bint" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Last Name</label>
                        <Input defaultValue="Al-Qamar" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Email Address</label>
                      <Input type="email" defaultValue="bint.alqamar@example.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Phone Number</label>
                      <Input type="tel" defaultValue="+974 5555 1234" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Bio</label>
                      <Textarea
                        placeholder="Tell customers about yourself and your brand..."
                        defaultValue="Passionate designer creating modest fashion for the modern Muslim woman. Based in Doha, Qatar."
                        rows={4}
                      />
                    </div>

                    <Button
                      onClick={() => handleSave("profile")}
                      className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </Button>
                  </div>

                  <div>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-r from-[#003153] to-[#00A388] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                        B
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="store">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Store className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Store Settings</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">Store Name</label>
                    <Input defaultValue="Bint Al-Qamar Modest Fashion" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">Store Description</label>
                    <Textarea
                      placeholder="Describe your store and what makes it unique..."
                      defaultValue="Premium modest fashion for the modern Muslim woman. We specialize in elegant, contemporary designs that honor tradition while embracing modern style."
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Store Category</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Modest Fashion</option>
                        <option>Women's Clothing</option>
                        <option>Islamic Wear</option>
                        <option>Accessories</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Business Type</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Individual</option>
                        <option>Small Business</option>
                        <option>Corporation</option>
                        <option>Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#003153] mb-2">Store Address</label>
                    <Textarea
                      placeholder="Enter your business address..."
                      defaultValue="Al Sadd Street, Doha, Qatar"
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Return Policy (Days)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Processing Time (Days)</label>
                      <Input type="number" defaultValue="2" />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("store")}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Store Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Payment Methods</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-[#003153]">Bank Account</h4>
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Bank Name</label>
                        <Input defaultValue="Qatar National Bank" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Account Number</label>
                        <Input defaultValue="****1234" type="password" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">IBAN</label>
                        <Input defaultValue="QA****1234" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Swift Code</label>
                        <Input defaultValue="QNBAQAQA" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-4">Payout Schedule</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Frequency</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>Weekly</option>
                          <option>Bi-weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Minimum Payout</label>
                        <Input defaultValue="QAR 100" />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("payment")}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Payment Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Notification Preferences</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-[#00A388]" />
                        <div>
                          <h4 className="font-medium text-[#003153]">Order Notifications</h4>
                          <p className="text-sm text-gray-600">Get notified about new orders and updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.orders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, orders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-5 h-5 text-[#F4BB3B]" />
                        <div>
                          <h4 className="font-medium text-[#003153]">Marketing Updates</h4>
                          <p className="text-sm text-gray-600">Receive tips and marketing insights</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.marketing}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Bell className="w-5 h-5 text-[#EF6950]" />
                        <div>
                          <h4 className="font-medium text-[#003153]">Platform Updates</h4>
                          <p className="text-sm text-gray-600">New features and important announcements</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.updates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-[#003153]" />
                        <div>
                          <h4 className="font-medium text-[#003153]">Security Alerts</h4>
                          <p className="text-sm text-gray-600">Important security and account notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.security}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, security: checked })}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("notifications")}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Security Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#003153] mb-2">Current Password</label>
                        <div className="relative">
                          <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">New Password</label>
                          <Input type="password" placeholder="Enter new password" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#003153] mb-2">Confirm Password</label>
                          <Input type="password" placeholder="Confirm new password" />
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="border-[#00A388] text-[#00A388] hover:bg-[#00A388] hover:text-white bg-transparent"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-[#003153]">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>
                    {twoFactorEnabled && (
                      <div className="mt-4 p-3 bg-[#00A388]/10 rounded-lg">
                        <p className="text-sm text-[#003153] font-medium">2FA is enabled</p>
                        <p className="text-xs text-gray-600">
                          Your account is protected with two-factor authentication
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-4">API Keys</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                        <div>
                          <p className="font-medium text-[#003153]">Production API Key</p>
                          <p className="text-sm text-gray-600">sk_live_****1234</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Key className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("security")}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="p-6 card-shadow bg-white/90 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Palette className="w-6 h-6 text-[#00A388]" />
                  <h3 className="text-lg font-semibold text-[#003153]">Display Preferences</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Language</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>English</option>
                        <option>العربية (Arabic)</option>
                        <option>Français</option>
                        <option>Español</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Timezone</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Asia/Qatar (GMT+3)</option>
                        <option>Asia/Dubai (GMT+4)</option>
                        <option>Asia/Riyadh (GMT+3)</option>
                        <option>UTC (GMT+0)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Currency</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>QAR - Qatari Riyal</option>
                        <option>USD - US Dollar</option>
                        <option>EUR - Euro</option>
                        <option>AED - UAE Dirham</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#003153] mb-2">Date Format</label>
                      <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-[#003153] mb-4">Theme Preferences</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-3 border-2 border-[#00A388] rounded-lg cursor-pointer">
                        <div className="w-full h-16 bg-gradient-to-r from-[#003153] to-[#00A388] rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Default</p>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#00A388]">
                        <div className="w-full h-16 bg-gradient-to-r from-gray-800 to-gray-600 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Dark</p>
                      </div>
                      <div className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#00A388]">
                        <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">Colorful</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSave("preferences")}
                    className="bg-gradient-to-r from-[#00A388] to-[#00C4A7] hover:from-[#00C4A7] hover:to-[#00A388]"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
