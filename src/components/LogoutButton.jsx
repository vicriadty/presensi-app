import { useNavigate } from "react-router-dom"
import { supabase } from '../services/supabase'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const confirm = window.confirm('Apakah kamu yakin ingin logout?')
    if (!confirm) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout gagal:', error.message)
      return
    }
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} className="btn text-white">
      Logout
    </button>
  )
}
