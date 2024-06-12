import psycopg2.pool as pgpool
from psycopg2 import ProgrammingError
from psycopg2.extras import  DictCursor
import boto3

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
        try :
            
            conn = self.__pool.getconn()
            print("connected to pool")
            with conn.cursor(cursor_factory=DictCursor) as cursor:

                cursor.execute(f"SELECT E.EVENTID, E.ADDRESS, L.LOCNAME, S.STATE_NAME, E.EVENTTITLE, E.STARTDATE, E.IMAGES FROM EVENTS AS E JOIN LOCATIONS AS L ON L.LOCID = E.LOCCITY JOIN STATE AS S ON S.STATE_ID = L.STATE JOIN EVENT_CATERGORY AS EC ON EC.EVENT_ID = E.EVENTCATERGORY WHERE EC.EVENT_NAME = '{self.__params['queryStringParameters']['eventType']}'")
                res = cursor.fetchall()

            self.__pool.putconn(conn)
            return [dict(row) for row in res]
        
        except ProgrammingError as error:
            print(error)
            return None
    
    def getEventById(self):
        conn = self.__pool.getconn()
        cursor = conn.cursor(cursor_factory=DictCursor)
        cursor.execute(f"SELECT E.ADDRESS,L.LOCNAME,S.STATE_NAME,E.EVENTTITLE,E.EVENTDESC, E.STARTDATE,E.IMAGES FROM EVENTS AS E JOIN LOCATIONS AS L ON L.LOCID = E.LOCCITY JOIN STATE AS S ON S.STATE_ID = L.STATE WHERE E.EVENTID ={self.__params['queryStringParameters']['eventid']}")
        res = cursor.fetchone()
        print(res)
        self.__pool.putconn(conn)
        return dict(res)
    
    def insertEvent(self):

        try:
            conn = self.__pool.getconn()
            
            with conn.cursor(cursor_factory=DictCursor) as cursor :
                cursor.execute(f""" 
                                    insert into events 
                                            (eventcreator,
                                            loccity,
                                            address,
                                            eventtitle,
                                            eventdesc,
                                            eventcatergory,
                                            startdate)
                                        values 
                                            (1,
                                            1,
                                            '4321 My Street',
                                            'sample event',
                                            'description',
                                            3,
                                            '2023-12-01 14:30:00-08')
                                        returning eventid
                                """)     
                res = cursor.fetchone()
            self.__pool.putconn(conn)

            return res
        
        except ProgrammingError as error:
            print(error)
            return None
        
    def getCitiesAndCatergories(self):
        conn = self.__pool.getconn()
        
        try:
            with conn.cursor(cursor_factory=DictCursor) as cursor :

                cursor.execute("select locid,locname from locations")
                locres = cursor.fetchall()
                cursor.execute("select * from event_catergory")
                catres = cursor.fetchall()

            self.__pool.putconn(conn)

            return {"locations":[dict(row) for row in locres], "catergories": [dict(row) for row in catres]}
        
        except ProgrammingError as error:
            print(error)
            return None

    def deleteEvent():
        pass
    
    def updateRecord():
        pass

class backendActions(dbqueries): 
    
    def __init__(self, eventBody, dbSecrets) -> None:
        super().__init__(eventBody, dbSecrets)
        self.__client = boto3.client('s3')
        self.eventBody = eventBody
        self.secrets = dbSecrets

    def insertEvent(self) -> None:

        try:

            eventid = dbqueries.insertEvent(self)

            for image in self.eventBody[""]:

                self.__client.put_object(Bucket="outsidenow-assets", Key=f"{eventid}/{image["name"]}", Body=image["body"])
                

        except Exception as e:
            print(e)
        

    def removeFromS3(self, imageName)-> None:
        
        try:
            pass
        except Exception as e:
            print(e)

    def getData(self):
        
        match self.eventBody["path"]:
            case "/getevents":
               
               return dbqueries.getEventByType(self)
            
            case "/eventdetails":

                return dbqueries.getEventById(self)
            
            case "/getcitiesandcatergories":

                return dbqueries.getCitiesAndCatergories(self)
