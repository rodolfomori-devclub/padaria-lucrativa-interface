import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/lib/utils"

const sidebarVariants = cva(
    "flex h-full flex-col bg-white border-r border-gray-200",
    {
        variants: {
            width: {
                default: "w-64",
                sm: "w-52",
                lg: "w-72",
            },
        },
        defaultVariants: {
            width: "default",
        },
    }
)

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sidebarVariants>
>(({ className, width, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(sidebarVariants({ width }), className)}
        {...props}
    />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex h-16 items-center justify-center border-b border-gray-200 px-6", className)}
        {...props}
    />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <nav
        ref={ref}
        className={cn("flex-1 px-4 py-6 space-y-2", className)}
        {...props}
    />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("border-t border-gray-200 p-4", className)}
        {...props}
    />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
    />
))
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider", className)}
        {...props}
    />
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarMenuItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("", className)}
        {...props}
    />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export {
    Sidebar, SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel, SidebarHeader, SidebarMenuItem
}

