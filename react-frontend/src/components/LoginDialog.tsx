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
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent
                className="relative p-8"
                sx={{
                    backdropFilter: "blur(20px)",
                    background: "linear-gradient(135deg, #1e293b, #0f172a)",
                    color: "white",
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 10, top: 10, color: "white" }}
                >
                    <Close />
                </IconButton>

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Welcome Back 👋
                </Typography>

                <Typography variant="body2" mb={3} color="gray">
                    Login to continue to your account
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5"
                >
                    <Controller
                        name="user_email"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Email is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                                sx={{
                                    input: { color: "white" },
                                    label: { color: "gray" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "#3b82f6" },
                                    },
                                }}
                            />
                        )}
                    />

                    <Controller
                        name="user_password"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Password is required" }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                fullWidth
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
                                    input: { color: "white" },
                                    label: { color: "gray" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "gray" },
                                        "&:hover fieldset": { borderColor: "#3b82f6" },
                                    },
                                }}
                            />
                        )}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 2,
                            borderRadius: "12px",
                            background: "linear-gradient(90deg, #3b82f6, #6366f1)",
                            textTransform: "none",
                            fontWeight: "bold",
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}