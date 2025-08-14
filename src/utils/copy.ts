import toast from "react-hot-toast";

export const handleCopy = ({ text, message = "Copiado com sucesso" }: { text: string; message?: string }) => {
    navigator.clipboard.writeText(text)
    toast.success(message)
}