import { useState } from "react"
import {
    // AppBar,
    // Toolbar,
    Typography,
    Button,
    Box,
    Container,
} from "@mui/material"
import LoginDialog from "../components/LoginDialog"
import { useNavigate } from "react-router-dom"

function App() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            {/* HEADER */}
            {/* <AppBar position="absolute" elevation={0} sx={{ background: "transparent" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="bold">
                        DreamHomes
                    </Typography>

                    <Box>
                        <Button color="inherit" sx={{ mr: 2 }}>
                            Buy
                        </Button>
                        <Button color="inherit" sx={{ mr: 2 }}>
                            Rent
                        </Button>
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
                    </Box>
                </Toolbar>
            </AppBar> */}

            {/* HERO SECTION */}
            <Box
                sx={{
                    height: "100vh",
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                }}
            >
                <Container>
                    <Typography variant="h2" fontWeight="bold" gutterBottom>
                        Find Your Dream Home
                    </Typography>

                    <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
                        Explore the best properties for buying and renting across the city.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/properties")}
                        sx={{
                            borderRadius: "30px",
                            px: 4,
                            textTransform: "none",
                            background: "linear-gradient(90deg,#3b82f6,#6366f1)",
                        }}
                    >
                        Explore Properties
                    </Button>
                </Container>
            </Box>

            {/* LOGIN DIALOG */}
            <LoginDialog open={open} onClose={() => setOpen(false)} />
        </>
    )
}

export default App