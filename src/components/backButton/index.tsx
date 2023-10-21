interface BackButtonProps {
    src:string
}
import { Link } from 'react-router-dom'; 
const BackButton:React.FC<BackButtonProps> = ({ src }) => {
    return (
        <div>
            <Link to={src}>
                <button>Back</button>
            </Link>
        </div>
    )
}
export default BackButton;