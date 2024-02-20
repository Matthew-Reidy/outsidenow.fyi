import psycopg2.pool as pgpool
from psycopg2.extras import  DictCursor
import boto3

class dbqueries:
    
    __pool = None
    __params: int = None
    __eventBody = None


    def __init__(self, eventBody, dbSecrets: dict, params: int) -> None:
        self.__pool = pgpool.SimpleConnectionPool(
                                                  minconn= 1,
                                                  maxconn= 5,
                                                  database=dbSecrets["database"],
                                                  host=dbSecrets["host"],
                                                  user=dbSecrets["username"],
                                                  password=dbSecrets["password"],
                                                  port=dbSecrets["port"]
                                                )
        self.__eventBody = eventBody
        self.__params= params
        

    def getEventByType(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute("select e.eventid, u.username AS creator_username,  l.locname AS location_city, e.eventdesc, e.startdate, e.enddate  FROM  events AS e JOIN users AS u ON e.eventcreator = u.userid JOIN   locations AS l ON e.loccity = l.locid")
        res = cursor.fetchmany(size=5)
        print(res)
        self.__pool.putconn(conn)
        return [dict(row) for row in res]
    
    def getEventById(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute("")
        res = cursor.fetchall()
        print(res)
        self.__pool.putconn(conn)
        return [dict(row) for row in res]
    
    def insertEvent(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute(f"insert into events (eventcreator, loccity, address, eventdesc, eventcatergory, startdate, enddate) values ({1},);")     
        self.__pool.putconn(conn)
        return {"Status" : "Success!"}
    
    def deleteEvent():
        pass
    
    def updateRecord():
        pass

class s3actions(dbqueries): 
    
    __bucketName: str = None
    __subFolderName: str = None

    def __init__(self, bucketName, subFolder, eventBody) -> None:
        super().__init__(eventBody)
        self.__bucketName = bucketName
        self.__subFolderName = subFolder

    def addToS3(self, imageList) -> None:

        bucket = self.__bucketName
        s3Client = boto3.client('s3')

        try:
            if not self.__subfolderDoesExists():
                self.createFolder()

            for image in imageList:

                s3Client.put_object()
                

        except Exception as e:
            print(e)
        

    def removeFromS3(self, imageName)-> None:
        try:
            pass
        except Exception as e:
            print(e)
    
    def __subfolderDoesExists(self) -> bool:
        folder = self.__subFolderName
        
        return True





