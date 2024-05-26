import json
import psycopg2 as pgpool
import boto3

def lambda_handler(event, context):

    secret = get_secret()

    if event["triggerSource"] == "PostConfirmation_ConfirmSignUp":
        enrollUser(event)


def enrollUser(event: dict, secret: dict) -> None:

    conn = psycopg2.connect("")

    cursor = conn.cursor()

    cursor.execute("INSERT INTO users() VALUES (%s, %s)", (event["userName"], event["request"]["userAttributes"]["email"]))


    conn.commit()

    cursor.close()

    conn.close()


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

