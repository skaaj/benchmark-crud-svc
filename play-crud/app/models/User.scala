package models

import reactivemongo.api.bson.{BSONDocument, BSONDocumentReader}

import scala.util.Try

case class User(nickname: String,
                firstname: String,
                lastname: String,
                age: Int)

object User {
  implicit object UserReader extends BSONDocumentReader[User] {
    override def readDocument(doc: BSONDocument): Try[User] = {
      for {
        nickname <- doc.getAsTry[String]("nickname")
        firstname <- doc.getAsTry[String]("firstname")
        lastname <- doc.getAsTry[String]("lastname")
        age <- doc.getAsTry[Int]("age")
      } yield User(nickname, firstname, lastname, age)
    }
  }
}