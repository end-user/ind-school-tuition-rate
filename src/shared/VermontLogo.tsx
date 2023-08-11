// @ts-ignore
import { ReactComponent as StateLogo } from '../VT_AOE.svg'
import { Link } from 'react-router-dom'

export default function VermontLogo() {
    return (
        <div className="= col-6 mt-2- mb-0">
            <Link to="/">
                <StateLogo style={{ height: "75px" }} />
            </Link>
        </div>
    )
}
