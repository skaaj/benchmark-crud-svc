package controllers

import javax.inject._
import play.api.mvc._
import repositories.UserRepository

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class MainController @Inject()(
    val controllerComponents: ControllerComponents,
    val userRepository: UserRepository
  )(implicit ec: ExecutionContext) extends BaseController {
  def ping(): Action[AnyContent] = Action { Ok }

  def getAll = handle { userRepository.getAll }

  def handle[T](block: => Future[T]): Action[AnyContent] = Action.async {
    block.map(x => Ok(x.toString))
  }
}
