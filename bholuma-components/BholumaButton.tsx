import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState, ReactNode } from "react";

// Extend ButtonProps to inherit className, disabled, type, etc.
interface LoadingButtonProps extends ButtonProps {
  onClick: () => void | Promise<void>;
  icon?: ReactNode;
}

export function BholumaButton({
  onClick,
  icon,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className={className}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  );
}
