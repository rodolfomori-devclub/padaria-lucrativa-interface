import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

interface SafeNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function SafeNavLink({
  to,
  children,
  className,
  onClick,
}: SafeNavLinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);

    // flushSync garante que React finaliza TODOS os efeitos pendentes de forma
    // síncrona antes de retornar — incluindo o cleanup dos portais do Radix UI.
    // Isso elimina a race condition entre o removeChild do portal e o do React.
    flushSync(() => {
      navigate(to);
    });
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
