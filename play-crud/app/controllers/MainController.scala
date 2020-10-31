package controllers

import javax.inject._
import play.api.mvc._
import repositories.UserRepository

import scala.concurrent.ExecutionContext

@Singleton
class MainController @Inject()(
    val controllerComponents: ControllerComponents,
    val userRepository: UserRepository
  )(implicit ec: ExecutionContext) extends BaseController {
  def ping(): Action[AnyContent] = Action { Ok }

  def getAll: Action[AnyContent] = Action.async {
    userRepository.getAll.map(xs => Ok(xs.toString))
  }
}
