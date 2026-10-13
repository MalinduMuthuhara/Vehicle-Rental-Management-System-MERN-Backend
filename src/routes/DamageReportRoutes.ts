import{Router} from 'express'
import{
    createDamageReport,
    updateDamageReport,
    deleteDamageReport,
    getDamageReports,
} from '../controller/DamageReportController'

const router = Router()
router.post('/' , createDamageReport)
router.put('/:damageReportId' ,  updateDamageReport)
router.delete('/:damageReportId' , deleteDamageReport)
router.get('/' , getDamageReports)

export default router