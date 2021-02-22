import s from './Contact.module.css'

const Contact: React.FC<PropsTypes> = ({contactTitle, contactDescription}) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactDescription}
        </div>
    )
}

export default Contact

type PropsTypes = {
    contactTitle: string
    contactDescription: any
}