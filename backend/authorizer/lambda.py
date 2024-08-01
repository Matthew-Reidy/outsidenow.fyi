import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    client = boto3.client('cognito-idp')

    try :

        response = client.get_user(AccessToken=event["authorizationToken"])

        return generatePolicy("user", "Allow", event['methodArn'])
    
    except client.exceptions.NotAuthorizedException as err:

        return generatePolicy("user", "Deny",  event['methodArn'])


def generatePolicy(principalId, effect, resource):
    authResponse = {}
    authResponse['principalId'] = principalId
    if (effect and resource):
        policyDocument = {}
        policyDocument['Version'] = '2012-10-17'
        policyDocument['Statement'] = []
        statementOne = {}
        statementOne['Action'] = 'execute-api:Invoke'
        statementOne['Effect'] = effect
        statementOne['Resource'] = resource
        policyDocument['Statement'] = [statementOne]
        authResponse['policyDocument'] = policyDocument

    return authResponse
