import{Router} from 'express'
import{
    createReview,
    updateReview,
    deleteReview,
    getReviews,
} from '../controller/ReviewController'

const router = Router()

router.post('/' , createReview)
router.put('/:reviewId' , updateReview)
router.delete('/:reviewId' , deleteReview)
router.get('/' , getReviews)

export default router