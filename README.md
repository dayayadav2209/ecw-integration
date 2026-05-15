# ecw-integration


# Endpoints

Patient demographics
https://fhir4.healow.com/fhir/r4/JAFJCD/Patient/WGrltmI2ngIkIfGEoFYOiWGBKTPz-9EUZ0RObS.tPio

allergy
https://fhir4.healow.com/fhir/r4/JAFJCD/AllergyIntolerance?patient=WGrltmI2ngIkIfGEoFYOiWGBKTPz-9EUZ0RObS.tPio

condition
https://fhir4.healow.com/fhir/r4/JAFJCD/Condition?patient=WGrltmI2ngIkIfGEoFYOiWGBKTPz-9EUZ0RObS.tPio&category=problem-list-item

medicationrequest
https://fhir4.healow.com/fhir/r4/JAFJCD/MedicationRequest?patient=WGrltmI2ngIkIfGEoFYOiWGBKTPz-9EUZ0RObS.tPio

immunization
https://fhir4.healow.com/fhir/r4/JAFJCD/Immunization?patient=WGrltmI2ngIkIfGEoFYOiWGBKTPz-9EUZ0RObS.tPio


# App details

Patient-code:- JAFJCD

Client:- pIsYBIyBR5Bjww3D9EpH4K97j0RnSYn0S8sIbjh00PU
RedirectURL:- https://grimy-ferry-humid.ngrok-free.dev/index.html
SecretID:I2e2uPy-0ASgVZZ5oWXLXdnZ_nnJH8tq6954RB7XLPQxr-bfuhhZkiYmcuEa7kBI

Scope:- patient/Patient.read patient/MedicationRequest.read patient/AllergyIntolerance.read patient/Immunization.read patient/Condition.read?category=http://terminology.hl7.org/CodeSystem/condition-category|problem-list-item online_access

Username:AdultFemaleFHIR andPassword:e@CWFHIR1
Username:AdultMaleFHIR andPassword:e@CWFHIR1
Username:ChildFemaleFHIR andPassword:e@CWFHIR1
Username:ChildMaleFHIR andPassword:e@CWFHIR1



# Configuration for authorization and token generation

Auth:- https://oauthserver.eclinicalworks.com/oauth/oauth2/authorize?aud=https://fhir4.healow.com/fhir/r4/JAFJCD

Token: -https://oauthserver.eclinicalworks.com/oauth/oauth2/token?aud=https://fhir4.healow.com/fhir/r4/JAFJCD