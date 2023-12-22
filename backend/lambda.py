import json
import boto3
import ddbqueries
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    dbSecrets = get_secret()
    
    if event['path'] == "/getevents":
        findEvents = ddbqueries.dbqueries(dbSecrets=dbSecrets, params=event["queryStringParameters"])
        events = findEvents.getEventByType()
        return response_body(200, events)
    
    if event['path'] == "/eventdetails":
        eventById = ddbqueries.dbqueries(dbSecrets=dbSecrets, params=event["queryStringParameters"])
        event = eventById.getEventById()
        return response_body(200, event)
    
    return response_body(200, "hello world!")

def response_body(statusCode, body):
    return {
        'statusCode': statusCode,
        'body': json.dumps(body)
    }

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
    return secret
