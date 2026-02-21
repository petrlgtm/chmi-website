import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function FloatingGive() {
  return (
    <div className="floating-give">
      <Link to="/give" aria-label="Give online to Christ's Heart Ministries">
        <Heart size={18} />
        Give
      </Link>
    </div>
  );
}
