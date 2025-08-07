import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { cn } from "~/lib/utils"
import { Label } from "./label"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState(false)
        const isPasswordType = type === "password"

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword)
        }

        // Determine the actual input type
        const inputType = isPasswordType && showPassword ? "text" : type

        return (
            <div className="relative">
                {label && <Label htmlFor={props.id}>{label}</Label>}
                <input
                    type={inputType}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        className,
                        isPasswordType && "pr-10"
                    )}
                    ref={ref}
                    {...props}
                />
                {isPasswordType && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }

