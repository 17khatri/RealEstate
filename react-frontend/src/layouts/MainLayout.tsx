import { useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
} from "@mui/material"
import LoginDialog from "../components/LoginDialog"
import { useAppSelector } from "../store/hooks"
import { logout } from "../services/logout"

export default function MainLayout() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === "/"
    const user = useAppSelector(state => state.auth.user_name)

    return (
        <>
            {/* COMMON HEADER */}
            <AppBar position={isHome ? "absolute" : "sticky"}
                elevation={isHome ? 0 : 1}
                sx={{
                    background: isHome ? "transparent" : "white",
                    color: isHome ? "white" : "black",
                    boxShadow: isHome ? "none" : undefined,
                }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        DreamHomes
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button color="inherit" sx={{ mr: 2 }}>
                            Buy
                        </Button>
                        <Button color="inherit" sx={{ mr: 2 }}>
                            Rent
                        </Button>
                        {!user ? (
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    background: "linear-gradient(90deg,#3b82f6,#6366f1)",
                                }}
                                onClick={() => setOpen(true)}
                            >
                                Login
                            </Button>
                        ) : (
                            <Box display="flex" alignItems="center">
                                <Typography variant="body1" fontWeight="bold">
                                    Hello, {user}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    sx={{
                                        ml: 2,
                                        borderRadius: "20px",
                                        textTransform: "none",
                                    }}
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* PAGE CONTENT WILL RENDER HERE */}
            <Outlet />

            <LoginDialog open={open} onClose={() => setOpen(false)} />
        </>
    )
}