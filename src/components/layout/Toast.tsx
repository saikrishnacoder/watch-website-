import { useEffect } from "react";
import { useUI } from "../../context/UIContext";

export function Toast() {
  const { toast, setToast } = useUI();

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(id);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className="maison-toast" role="status">
      {toast}
    </div>
  );
}
