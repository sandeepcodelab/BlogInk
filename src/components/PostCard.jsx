import appwriteService from '../appwrite/config'
import { Link } from 'react-router'

function PostCard({$id, images, title}) {
    
    return (
        <Link to={`/Post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(images)} alt={title} className='rounded-xl' />
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;