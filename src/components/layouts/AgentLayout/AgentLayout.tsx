/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Phone as PhoneIcon,
  History as HistoryIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  ExitToApp as SignOutIcon,
  Voicemail as VoicemailIcon,
  PhoneMissed as MissedCallsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"

const DRAWER_WIDTH = 320
const COLLAPSED_WIDTH = 80

const agentNavItems = [
  { path: "/agent/dashboard", label: "Dashboard", icon: DashboardIcon },
  { path: "/agent/active-calls", label: "Active calls", icon: PhoneIcon },
  { path: "/agent/call-history", label: "Call history", icon: HistoryIcon },
  { path: "/agent/voicemail", label: "Voicemail", icon: VoicemailIcon },
  { path: "/agent/missed-calls", label: "Missed calls", icon: MissedCallsIcon },
  { path: "/agent/analytics", label: "Analytics", icon: AnalyticsIcon },
]

interface ResponsiveAgentLayoutProps {
  children: React.ReactNode
}

export const AgentLayout: React.FC<ResponsiveAgentLayoutProps> = ({ children }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const currentPath = location.pathname === "/agent" ? "/agent/dashboard" : location.pathname

  const handleNavigation = (path: string) => {
    navigate(path)
    if (isMobile) setMobileDrawerOpen(false)
  }

  const handleSignOut = () => {
    logout()
    navigate("/login")
  }

  const SidebarContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", bgcolor: "white" }}>
      {/* Hospital Logo and Title */}
      <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderBottom: "1px solid #e5e7eb",
          minHeight: "100px",
          justifyContent: desktopSidebarCollapsed && !isMobile ? "center" : "space-between",
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "#0d9488",
            fontSize: "1rem",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
        >
          BH
        </Avatar>

        {!(desktopSidebarCollapsed && !isMobile) && (
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ fontSize: "1rem", color: "#111827", lineHeight: 1.2 }}
              noWrap
            >
              Butabika Hospital
            </Typography>
            <Typography variant="caption" color="#9ca3af" sx={{ fontSize: "0.75rem", display: "block" }} noWrap>
              Call agent portal
            </Typography>
          </Box>
        )}
      </Box>

      {/* Main Navigation */}
      <List sx={{ px: isMobile || !desktopSidebarCollapsed ? 2 : 1.5, py: 1, mt: 1 }}>
        {agentNavItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: "4px" }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                title={desktopSidebarCollapsed && !isMobile ? item.label : ""}
                sx={{
                  borderRadius: "8px",
                  py: "10px",
                  px: desktopSidebarCollapsed && !isMobile ? "8px" : "12px",
                  bgcolor: isActive ? "#0d9488" : "transparent",
                  color: isActive ? "white" : "#6b7280",
                  "&:hover": {
                    bgcolor: isActive ? "#0d9488" : "#f9fafb",
                  },
                  transition: "all 0.2s ease-in-out",
                  minHeight: "44px",
                  justifyContent: desktopSidebarCollapsed && !isMobile ? "center" : "flex-start",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: "32px",
                    mr: desktopSidebarCollapsed && !isMobile ? "0px" : "12px",
                    "& .MuiSvgIcon-root": {
                      fontSize: "20px",
                    },
                  }}
                >
                  <Icon />
                </ListItemIcon>

                {!(desktopSidebarCollapsed && !isMobile) && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                      color: "inherit",
                      lineHeight: "20px",
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Divider sx={{ mx: isMobile || !desktopSidebarCollapsed ? 2 : 1.5, my: 2, borderColor: "#e5e7eb" }} />

      {/* Bottom Navigation */}
      <Box sx={{ mt: "auto", p: isMobile || !desktopSidebarCollapsed ? 2 : 1.5 }}>
        <Divider sx={{ mb: 2, borderColor: "#e5e7eb", mx: isMobile || !desktopSidebarCollapsed ? -2 : -1.5 }} />

        <ListItemButton
          onClick={() => handleNavigation("/agent/settings")}
          title={desktopSidebarCollapsed && !isMobile ? "Settings" : ""}
          sx={{
            borderRadius: "8px",
            py: "10px",
            px: desktopSidebarCollapsed && !isMobile ? "8px" : "12px",
            mb: "4px",
            color: "#6b7280",
            "&:hover": {
              bgcolor: "#f9fafb",
            },
            transition: "all 0.2s ease-in-out",
            minHeight: "44px",
            justifyContent: desktopSidebarCollapsed && !isMobile ? "center" : "flex-start",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "32px",
              mr: desktopSidebarCollapsed && !isMobile ? "0px" : "12px",
              "& .MuiSvgIcon-root": {
                fontSize: "20px",
                color: "#6b7280",
              },
            }}
          >
            <SettingsIcon />
          </ListItemIcon>

          {!(desktopSidebarCollapsed && !isMobile) && (
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontSize: "14px",
                color: "#6b7280",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            />
          )}
        </ListItemButton>

        <ListItemButton
          onClick={handleSignOut}
          title={desktopSidebarCollapsed && !isMobile ? "Sign out" : ""}
          sx={{
            borderRadius: "8px",
            py: "10px",
            px: desktopSidebarCollapsed && !isMobile ? "8px" : "12px",
            color: "#dc2626",
            "&:hover": {
              bgcolor: "#fef2f2",
            },
            transition: "all 0.2s ease-in-out",
            minHeight: "44px",
            justifyContent: desktopSidebarCollapsed && !isMobile ? "center" : "flex-start",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "32px",
              mr: desktopSidebarCollapsed && !isMobile ? "0px" : "12px",
              "& .MuiSvgIcon-root": {
                fontSize: "20px",
                color: "#dc2626",
              },
            }}
          >
            <SignOutIcon />
          </ListItemIcon>

          {!(desktopSidebarCollapsed && !isMobile) && (
            <ListItemText
              primary="Sign out"
              primaryTypographyProps={{
                fontSize: "14px",
                color: "#dc2626",
                fontWeight: 500,
                lineHeight: "20px",
              }}
            />
          )}
        </ListItemButton>
      </Box>
    </Box>
  )

  const sidebarWidth = isMobile ? 0 : desktopSidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f9fafb" }}>
      {/* Desktop Sidebar - Now part of the flex layout */}
      {!isMobile && (
        <Box
          sx={{
            width: desktopSidebarCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
            flexShrink: 0,
            transition: "width 0.3s ease-in-out",
            height: "100vh",
            bgcolor: "white",
            borderRight: "1px solid #e5e7eb",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <SidebarContent />
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0, // Prevents flex item from overflowing
        }}
      >
        {/* Header */}
        <AppBar
          position="static" // Changed from fixed to static
          sx={{
            bgcolor: "white",
            color: "text.primary",
            boxShadow: "none",
            borderBottom: "1px solid #e5e7eb",
            height: { xs: 64, md: 102 },
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              minHeight: { xs: 64, md: 102 },
              px: { xs: 2, md: 3 },
              alignItems: "center",
              display: "flex",
              height: { xs: 64, md: 102 },
              flexDirection: { xs: "row", md: "row" },
              gap: { xs: 1, md: 3 },
            }}
          >
            {/* Left: Mobile Menu + Page Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0 }}>
              {isMobile && (
                <IconButton
                  onClick={() => setMobileDrawerOpen(true)}
                  sx={{
                    color: "text.primary",
                    bgcolor: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    "&:hover": {
                      bgcolor: "#e5e7eb",
                    },
                    flexShrink: 0,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "1.125rem", md: "1.375rem" },
                  lineHeight: "1.4",
                  color: "text.primary",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Dashboard
              </Typography>
            </Box>

            {/* Right: Search + Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, md: 4 },
                ml: "auto",
              }}
            >
              {/* Search Bar - Hidden on mobile unless toggled */}
              {(!isMobile || showSearch) && (
                <TextField
                  placeholder="Search for anything here..."
                  size="medium"
                  sx={{
                    width: { xs: "100%", md: 450 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      height: "48px",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1d5db",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                        borderWidth: "1px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "0.9375rem",
                      "&::placeholder": {
                        color: "#9ca3af",
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#9ca3af", fontSize: "1.375rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {/* Mobile Search Toggle */}
              {isMobile && !showSearch && (
                <IconButton
                  onClick={() => setShowSearch(true)}
                  sx={{
                    bgcolor: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      bgcolor: "#e5e7eb",
                    },
                  }}
                >
                  <SearchIcon sx={{ fontSize: "1.25rem", color: "#6b7280" }} />
                </IconButton>
              )}

              {/* Mobile Search Close */}
              {isMobile && showSearch && (
                <IconButton
                  onClick={() => setShowSearch(false)}
                  sx={{
                    bgcolor: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      bgcolor: "#e5e7eb",
                    },
                  }}
                >
                  <CloseIcon sx={{ fontSize: "1.25rem", color: "#6b7280" }} />
                </IconButton>
              )}

              {/* Divider - Hidden on mobile */}
              {!isMobile && <Box sx={{ width: "1px", height: "32px", bgcolor: "#e5e7eb" }} />}

              {/* Notifications */}
              <IconButton
                size="medium"
                sx={{
                  bgcolor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  width: { xs: 40, md: 44 },
                  height: { xs: 40, md: 44 },
                  "&:hover": {
                    bgcolor: "#e5e7eb",
                  },
                }}
              >
                <Badge
                  badgeContent={user?.role === "supervisor" ? 2 : 0}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      minWidth: "18px",
                      height: "18px",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: { xs: "1.25rem", md: "1.375rem" }, color: "#6b7280" }} />
                </Badge>
              </IconButton>

              {/* User Avatar */}
              <Avatar
                sx={{
                  width: { xs: 40, md: 44 },
                  height: { xs: 40, md: 44 },
                  bgcolor: "#0d9488",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {user?.name?.charAt(0) || "U"}
              </Avatar>

              {/* Desktop Sidebar Collapse Button */}
              {!isMobile && (
                <IconButton
                  onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
                  sx={{
                    color: "#6b7280",
                    bgcolor: "#f3f4f6",
                    border: "1px solid #e5e7eb",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      bgcolor: "#e5e7eb",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {desktopSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f9fafb",
            overflow: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
