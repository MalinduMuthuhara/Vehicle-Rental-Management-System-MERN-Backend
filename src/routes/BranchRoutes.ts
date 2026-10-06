import{Router} from 'express'
import {
    createBranch,
    updateBranch,
    deleteBranch,
    getBranches,
} from '../controller/BranchController'

const router = Router()

router.post('/',createBranch )
router.put('/:branchId',updateBranch)
router.delete('/:branchId' , deleteBranch)
router.get('/' ,getBranches)

export default router