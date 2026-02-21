import { useState } from "react"
import { Button } from "@mui/material"
import LoginDialog from "./components/LoginDialog"

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Login
      </Button>

      <LoginDialog open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App