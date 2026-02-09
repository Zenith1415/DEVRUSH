import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 grid-bg">
      <div className="text-center font-terminal">
        <p className="text-accent text-sm mb-4 neon-text">$ cat /dev/null</p>
        <h1 className="text-6xl sm:text-8xl font-bold gradient-text mb-4">404</h1>
        <p className="text-muted-foreground mb-2">{">"} ERROR: FILE_NOT_FOUND</p>
        <p className="text-muted-foreground text-sm mb-8">The page you're looking for doesn't exist in this system.</p>
        <Link
          to="/home"
          className="inline-block text-sm px-6 py-2 border border-accent/50 text-accent rounded hover:bg-accent/10 transition-colors"
        >
          $ cd /home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
