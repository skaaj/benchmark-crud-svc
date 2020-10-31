package models

import reactivemongo.api.bson.{BSONDocument, BSONDocumentReader}

import scala.util.Try

case class User(nickname: String,
                firstname: String,
                lastname: String,
                experience: Int)

object User {
  implicit object UserReader extends BSONDocumentReader[User] {
    override def readDocument(doc: BSONDocument): Try[User] = {
      for {
        nickname <- doc.getAsTry[String]("nickname")
        firstname <- doc.getAsTry[String]("firstname")
        lastname <- doc.getAsTry[String]("lastname")
        experience <- doc.getAsTry[Int]("experience")
      } yield User(nickname, firstname, lastname, experience)
    }
  }
}