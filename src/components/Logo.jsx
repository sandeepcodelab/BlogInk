import BlogInkLogo from '../assets/blogink.png'

function Logo({width = '100px'}){
    return(
        <img src={BlogInkLogo} alt="Logo" width={width} />
    )
}

export default Logo;