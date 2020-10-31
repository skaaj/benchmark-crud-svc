package repositories

import play.modules.reactivemongo.ReactiveMongoApi
import reactivemongo.api.bson.collection.BSONCollection
import reactivemongo.api.bson.{BSONDocument, BSONDocumentReader}

import scala.concurrent.{ExecutionContext, Future}

trait MongoRepository {
  implicit val ec: ExecutionContext

  val collectionName: String
  val mongoApi: ReactiveMongoApi

  protected val collection: Future[BSONCollection] =
    mongoApi.database.map(_.collection(collectionName))

  protected def find[T](selector: BSONDocument)(implicit reader: BSONDocumentReader[T]): Future[Seq[T]] = {
    collection.flatMap(_.find(selector).cursor[T]().collect(-1))
  }
}