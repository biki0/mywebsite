import './bad.css'


type FooterProp = { info : string}

const Footer = ({ info }: FooterProp) => {

    return (

        <div className="footer-info">

            <p> {info} </p>

        </div>

    )

}

export default Footer