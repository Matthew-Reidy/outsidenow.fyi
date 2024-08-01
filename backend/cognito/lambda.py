import json
import psycopg2.pool as pgpool
from botocore.exceptions import ClientError
import boto3

def lambda_handler(event, context):

    secret = get_secret()

    if event["triggerSource"] == "PostConfirmation_ConfirmSignUp":
        enrollUser(event, secret)


def enrollUser(event: dict, secret: dict) -> None:

    pool = createPool(secret)

    conn = pool.getconn()

    cursor = conn.cursor()

    cursor.execute("INSERT INTO users( username, email ) VALUES (%s, %s)", (event["userName"], event["request"]["userAttributes"]["email"]))

    conn.commit()

    cursor.close()

    pool.putconn(conn)


def createPool(dbSecrets: dict):
   return pgpool.SimpleConnectionPool(
                                minconn= 1,
                                maxconn= 5,
                                database=dbSecrets["database"],
                                host=dbSecrets["host"],
                                user=dbSecrets["username"],
                                password=dbSecrets["password"],
                                port=dbSecrets["port"]
                                )

def get_secret():

    secret_name = "osn_service_worker"
    region_name = "us-west-1"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']
    return json.loads(secret)

