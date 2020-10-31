package repositories

import javax.inject.{Inject, Singleton}
import models.User
import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.Cursor
import reactivemongo.api.bson.{BSONDocument, BSONDocumentReader}
import reactivemongo.api.bson.collection.BSONCollection

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject()(val mongoApi: ReactiveMongoApi)(implicit ec: ExecutionContext) {
  implicit def userReader: BSONDocumentReader[User] = User.UserReader

  private val collectionName = "users"

  private def run[T](task: BSONCollection => Future[T]): Future[T] = {
    mongoApi.database
      .map(_.collection(collectionName))
      .flatMap(task)
  }

  def getAll: Future[Seq[User]] = run { collection =>
    collection.find(BSONDocument())
      .cursor[User]()
      .collect(-1, Cursor.FailOnError[Seq[User]]())
  }
}
