import AuthController from './AuthController'
import EmailController from './EmailController'
import FaqController from './FaqController'
import CategoryController from './CategoryController'
import ActivityController from './ActivityController'
import ParticipantController from './ParticipantController'
import ActivityRegistrationController from './ActivityRegistrationController'
import PaymentController from './PaymentController'
import AttendanceReportController from './AttendanceReportController'
import AttendanceController from './AttendanceController'
import QrCodeController from './QrCodeController'
import DiplomaController from './DiplomaController'
import WinnerController from './WinnerController'
const Api = {
    AuthController: Object.assign(AuthController, AuthController),
EmailController: Object.assign(EmailController, EmailController),
FaqController: Object.assign(FaqController, FaqController),
CategoryController: Object.assign(CategoryController, CategoryController),
ActivityController: Object.assign(ActivityController, ActivityController),
ParticipantController: Object.assign(ParticipantController, ParticipantController),
ActivityRegistrationController: Object.assign(ActivityRegistrationController, ActivityRegistrationController),
PaymentController: Object.assign(PaymentController, PaymentController),
AttendanceReportController: Object.assign(AttendanceReportController, AttendanceReportController),
AttendanceController: Object.assign(AttendanceController, AttendanceController),
QrCodeController: Object.assign(QrCodeController, QrCodeController),
DiplomaController: Object.assign(DiplomaController, DiplomaController),
WinnerController: Object.assign(WinnerController, WinnerController),
}

export default Api