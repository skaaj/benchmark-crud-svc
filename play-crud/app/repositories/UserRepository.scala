package repositories

import javax.inject.{Inject, Singleton}
import models.User
import models.User._
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.bson.BSONDocument

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject() (val mongoApi: ReactiveMongoApi)(implicit val ec: ExecutionContext) extends MongoRepository {
  override val collectionName: String = "users"
  def getAll: Future[Seq[User]] = find(BSONDocument())
}
