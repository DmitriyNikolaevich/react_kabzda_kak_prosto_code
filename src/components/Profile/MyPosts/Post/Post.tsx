import s from './Post.module.css'

const Post: React.FC<PropsType> = (props) => {
    return (
            <div className={s.item}>
                <div>
                    <img src={props.src} alt="Alt text" />
                </div>
                {props.text}
                <div>
                    Likes: {props.likes}
                </div>
            </div>
    )
}

export default Post

type PropsType = {
    src: string
    text: string
    likes: number
}