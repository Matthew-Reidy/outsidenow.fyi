import psycopg2.pool as pgpool

from psycopg2.extras import  DictCursor


class dbqueries:
    
    __pool = None
    __params = None


    def __init__(self, params: dict, dbSecrets: dict) -> None:
        self.__pool = pgpool.SimpleConnectionPool(
                                                  minconn= 1,
                                                  maxconn= 5,
                                                  database=dbSecrets["database"],
                                                  host=dbSecrets["host"],
                                                  user=dbSecrets["username"],
                                                  password=dbSecrets["password"],
                                                  port=dbSecrets["port"]
                                                )
        self.__params = params
      
    def getEventByType(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute(f"SELECT E.EVENTID, E.ADDRESS, L.LOCNAME, S.STATE_NAME, E.EVENTTITLE, E.STARTDATE, E.IMAGES FROM EVENTS AS E JOIN LOCATIONS AS L ON L.LOCID = E.LOCCITY JOIN STATE AS S ON S.STATE_ID = L.STATE JOIN EVENT_CATERGORY AS EC ON EC.EVENT_ID = E.EVENTCATERGORY WHERE EC.EVENT_NAME = '{self.__params['eventType']}'")
        res = cursor.fetchmany(size=5)
        self.__pool.putconn(conn)
        return [dict(row) for row in res]
    
    def getEventById(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute(f"SELECT E.ADDRESS,L.LOCNAME,S.STATE_NAME,E.EVENTTITLE,E.EVENTDESC, E.STARTDATE,E.IMAGES FROM EVENTS AS E JOIN LOCATIONS AS L ON L.LOCID = E.LOCCITY JOIN STATE AS S ON S.STATE_ID = L.STATE WHERE E.EVENTID ={self.__params['eventid']}")
        res = cursor.fetchone()
        print(res)
        self.__pool.putconn(conn)
        return dict(res)
    
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
