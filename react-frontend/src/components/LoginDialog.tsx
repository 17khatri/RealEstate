import { useState } from "react"
import {
    Dialog,
    DialogContent,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Box,
} from "@mui/material"
import { Visibility, VisibilityOff, Close } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginApi } from "../api/authApi"
import { useAppDispatch } from "../store/hooks"
import { setUser } from "../store/authSlice"
import { setToken } from "../services/authService"

const loginSchema = z.object({
    user_email: z.string().email("Invalid email address"),
    user_password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface Props {
    open: boolean
    onClose: () => void
}

export default function LoginDialog({ open, onClose }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            user_email: "",
            user_password: "",
        },
    })

    const dispatch = useAppDispatch()
    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await loginApi(data)
            const user = response.data.user
            console.log("Login successful:", user)
            dispatch(setUser({
                email: user.user_email,
                role: user.role,
                id: user.user_id,
                name: user.user_name,
                token: response.data.token,
            }))
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            reset()
            onClose()
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(25px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    color: "white",
                },
            }}
        >
            <DialogContent sx={{ p: 4, position: "relative" }}>

                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                        color: "white",
                    }}
                >
                    <Close />
                </IconButton>

                {/* Title */}
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ textAlign: "center" }}
                >
                    Welcome Back
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ textAlign: "center", mb: 4, opacity: 0.7 }}
                >
                    Sign in to manage your properties
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email */}
                    <Controller
                        name="user_email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Email Address"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        color: "white",
                                        "& fieldset": {
                                            borderColor: "rgba(255,255,255,0.3)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3b82f6",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(255,255,255,0.7)",
                                    },
                                }}
                            />
                        )}
                    />

                    {/* Password */}
                    <Controller
                        name="user_password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                sx={{ color: "white" }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "12px",
                                        color: "white",
                                        "& fieldset": {
                                            borderColor: "rgba(255,255,255,0.3)",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#3b82f6",
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "rgba(255,255,255,0.7)",
                                    },
                                }}
                            />
                        )}
                    />

                    {/* Login Button */}
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        sx={{
                            mt: 3,
                            borderRadius: "30px",
                            padding: "12px",
                            fontWeight: "bold",
                            textTransform: "none",
                            background: "linear-gradient(90deg,#3b82f6,#6366f1)",
                            boxShadow: "0 10px 25px rgba(59,130,246,0.4)",
                            color: "white",
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}